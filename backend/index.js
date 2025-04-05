import express from "express";
import {Server} from "socket.io";
import {createServer} from "http";
import cors from "cors"
import {v2 as cloudinary} from "cloudinary"
import dotenv from "dotenv"
import connectDB from "./utils/db.js";
import { errorMiddleware } from "./middlewares/errorHandler.js";
import cookieParser from "cookie-parser";
import { CHAT_JOINED, NEW_MESSAGE, NEW_MESSAGE_ALERT, ONLINE_USERS, START_TYPING, STOP_TYPING } from "./constants/events.js";
import { v4 as uuid } from "uuid";
import { getSockets } from "./utils/features.js";
import Message from "./models/Message.js";




import userRoutes from "./routes/user.js"
import chatRoutes from "./routes/chats.js"
import { socketAuthenticator } from "./middlewares/auth.js";
import Chat from "./models/Chat.js";
import { connectCloudinary } from "./utils/cloudinary.js";


dotenv.config();
const PORT = process.env.PORT || 4000; 
const SOCKET_URL = process.env.SOCKET_URL;
const CLIENT_URL = process.env.CLIENT_URL;


const app = express();
const server = createServer(app)
const io = new Server(server, {
    path: '/socket.io',
    cors: {
        origin: SOCKET_URL ? [SOCKET_URL] : "*", 
        credentials: true
    }
});

const userSocketIdsMap = new Map();
 
// connect to db  and cloudinary
connectDB(process.env.DB_URL);
connectCloudinary();

// middlewares 
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin : CLIENT_URL ? [CLIENT_URL] : "*", 
    credentials: true
}))
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/chat", chatRoutes);


app.get("/" , (req, res) => {
    res.send("Server started successfully")
})

app.use(errorMiddleware);  //make sure to use this middleware at last



// Using namespace '/api/v1'  -> bcz from backend we are sending the request form url/api/v1 that why we are like appending /api/v1 here
const namespace = io.of('/api/v1');
app.set("io", namespace); // set the io instance of access in other functions

namespace.use((socket , next) => socketAuthenticator(socket, next)); // socket middlware

namespace.on("connection" , (socket) => {
    console.log("a user is connected" , socket.id)

    const user = socket.user;

    userSocketIdsMap.set(user._id.toString() , socket.id)  //mapping all the connected user'id to their socket

    // console.log("All connected users ", userSocketIdsMap)


    socket.on(NEW_MESSAGE , async (data) => {  //data -> we are getting from frontend
        const {chatId , members, message} = data;

        const messageForRealTime = {  //message to send on frontend
            content: message,
            _id: uuid(),
            sender : {
                _id: user._id,
                name:  user.name
            },
            chat : chatId,
            createdAt: new Date().toString(),
        }
        
        const membersSocketIDs = getSockets(members);  //get all the socketIds of members from the UserSocketIDsMap
        console.log(membersSocketIDs);

        namespace.to(membersSocketIDs).emit(NEW_MESSAGE , {   // send the message to all the members on their UI
          chatId,
          message : messageForRealTime
        })

        namespace.to(membersSocketIDs).emit(NEW_MESSAGE_ALERT , {chatId}) //new message alert notification for the chat

        try{
            const messageCreated = await Message.create({
                content : message,
                sender : user._id,
                chat: chatId
            })

            await Chat.findByIdAndUpdate(chatId, {
                lastMessage: messageCreated._id
            })

        }
        catch(err)
        {
            throw new Error(err);
        }
    })

    socket.on(START_TYPING, async({members, chatId}) => {
        const membersSocketsIDs = getSockets(members);
        socket.to(membersSocketsIDs).emit(START_TYPING, { chatId });
    } )

    socket.on(STOP_TYPING, ({members, chatId}) => {
        const membersSocketIDs = getSockets(members);

        namespace.to(membersSocketIDs).emit(STOP_TYPING, {chatId});
    })


    socket.on(CHAT_JOINED, ({userId , members}) => {
        const membersSocketIDs = getSockets(members);
        namespace.to(membersSocketIDs).emit(ONLINE_USERS, Array.from(userSocketIdsMap))
    })

    socket.on("disconnect" , () => {
        console.log("user disconnected")
    })
})


server.listen(PORT , () => {
    console.log("Server is started at port : ",PORT);
}) 



export {
    userSocketIdsMap
}