import express from "express";
const app = express();

import dotenv from "dotenv"
import connectDB from "./utils/db.js";
import { errorMiddleware } from "./middlewares/errorHandler.js";
import cookieParser from "cookie-parser";


import userRoutes from "./routes/user.js"
import chatRoutes from "./routes/chats.js"


dotenv.config();
const PORT = process.env.PORT || 4000; 


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

app.listen(PORT , () => {
    console.log("Server is started at port : ",PORT);
}) 