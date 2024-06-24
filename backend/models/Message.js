import mongoose, { Schema, mongo } from "mongoose";

const messageSchema = new Schema({
    content : {
        type: String
    },
    sender  : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    chat : {
        type : Schema.Types.ObjectId,
        ref : "Chat",
        required : true
    },
    attachments :[{
        type : String  //the url will be stored into the cloudinary
    }]
},
{
    timestamps : true
})

const Message = mongoose.model("Message", messageSchema);
export default Message