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
    attachments: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
},
{
    timestamps : true
})

const Message = mongoose.model("Message", messageSchema);
export default Message