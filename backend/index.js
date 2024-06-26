import express from "express";
import {Server} from "socket.io";
import {createServer} from "http";

import dotenv from "dotenv"
import connectDB from "./utils/db.js";
import { errorMiddleware } from "./middlewares/errorHandler.js";
import cookieParser from "cookie-parser";
import { NEW_MESSAGE, NEW_MESSAGE_ALERT } from "./constants/events.js";
import { v4 as uuid } from "uuid";
import { getSockets } from "./utils/features.js";
import Message from "./models/Message.js";




import userRoutes from "./routes/user.js"
import chatRoutes from "./routes/chats.js"


dotenv.config();
const PORT = process.env.PORT || 4000; 


const app = express();
const server = createServer(app)
const io = new Server(server, {});
const userSocketIdsMap = new Map();


// connect to db 
connectDB(process.env.DB_URL);


// middlewares 
app.use(express.json())
app.use(cookieParser())
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/chat", chatRoutes);


app.get("/" , (req, res) => {
    res.send("Server started successfully")
})

app.use(errorMiddleware);  //make sure to use this middleware at last






io.on("connection" , (socket) => {
    console.log("a user is connected" , socket.id)

    const user = {
        _id : "3i29i9239",
        name : "user1"
    }

    userSocketIdsMap.set(user._id.toString() , socket.id)  //mapping all the connected user'id to their socket

    console.log("All connected users ", userSocketIdsMap)


    socket.on(NEW_MESSAGE , async (data) => {  //data -> we are getting from frontend
        const {chatId , members, message} = data;

        const messageForRealTime = {  //message to send on frontend
            content: message,
            // _id: uuid(),
            sender : {
                _id: user._id,
                name:  user.name
            },
            chat : chatId,
            createdAt: new Date().toString(),
        }
        
        const membersSocketIDs = getSockets(members);  //get all the socketIds of members from the UserSocketIDsMap
        console.log(membersSocketIDs);

        io.to(membersSocketIDs).emit(NEW_MESSAGE , {   // send the message to all the members on their UI
          chatId,
          message : messageForRealTime
        })

        io.to(members).emit(NEW_MESSAGE_ALERT , {chatId}) //new message alert notification for the chat

        // try{
        //     await Message.create({
        //         content : message,
        //         sender : user._id,
        //         chat: chatId
        //     })
        // }
        // catch(err)
        // {
        //     throw new Error(err);
        // }
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