import mongoose from "mongoose";

const connectDB = (url) => {
    mongoose.connect(url , {dbName : "ChatApplication"})
                                                    .then((data) => console.log("Database connected successfully : ", data.connection.host))
                                                    .catch((error)=> console.log("DB connection failed : ", error))
                                                }


export default connectDB;