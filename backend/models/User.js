import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name : {
        type: String,
        required : true,
    },
    username : {
        type : String,
        unique : true,
        trim : true,
        required : true
    },
    password : {
        type: String,
        required : true,
        select : false,  //when ever we will fetch the user from the db so the password will not be fetch by default
     },
    avatar : {
        type: String,
        required : true
    },
    bio : {
        type: String
    },
    email : {
        type: String
    },
    dateOfBirth : {
        type: String,
    },
    gender : {
        type : String
    },
    friends : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : "User"
        }
    ]
},
{
    timestamps : true
})

export const User = mongoose.model("User", userSchema);
