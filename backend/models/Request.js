import mongoose, { Schema, mongo } from "mongoose";

const requestSchema = new Schema({
    status : {
     enum : ["Pending" , "Accepted", "Rejected"],
     default : "Pending", 
     required : true
    },
    sender : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required :  true
    },
    receiver : {
        type : Schema.Types.ObjectId,
        ref :  "User",
        required : true
    }
},
{
    timestamps : true
})

export const Request = mongoose.model("Request", requestSchema);