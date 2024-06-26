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
    avatar: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    bio : {
        type: String
    },
    email : {
        type: String
    },
    dateOfBirth : {
        type: Date,
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

const User = mongoose.model("User", userSchema);

export default User;