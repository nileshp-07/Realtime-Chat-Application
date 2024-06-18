import express from "express";
const app = express();

import userRoutes from "./routes/user.js"
import dotenv from "dotenv"

dotenv.config();
const PORT = process.env.PORT || 4000; 




// middlewares 
app.use("/api/v1/users", userRoutes);


app.get("/" , (req, res) => {
    res.send("Server started successfully")
})

app.listen(PORT , () => {
    console.log("Server is started at port : ",PORT);
}) 