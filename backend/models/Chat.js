import mongoose, { Schema, mongo } from "mongoose";

const chatSchema = new Schema({
    name : {
        type: String,
        required : true,
    },
    admin : {
        type : Schema.Types.ObjectId,
        ref : "User"
    },
    isGroup : {
        type: Boolean,
        default : false
    },
    members : [{
        type : Schema.Types.ObjectId,
        ref : "User"
    }],
    lastMessage : {
        type: Schema.Types.ObjectId,
        ref : "Message"
    }
},
{
    timestamps : true
})

const Chat = mongoose.model("Chat", chatSchema);
export default Chat;