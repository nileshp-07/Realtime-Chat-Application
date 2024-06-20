import express from "express";
const app = express();

import userRoutes from "./routes/user.js"
import dotenv from "dotenv"
import connectDB from "./utils/db.js";

dotenv.config();
const PORT = process.env.PORT || 4000; 


// connect to db 
connectDB(process.env.DB_URL);


// middlewares 
app.use(express.json())

app.use("/api/v1/user", userRoutes);



app.get("/" , (req, res) => {
    res.send("Server started successfully")
})

app.listen(PORT , () => {
    console.log("Server is started at port : ",PORT);
}) 