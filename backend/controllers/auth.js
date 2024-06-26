import User from "../models/User.js";
import bcrypt from "bcrypt"
import { sendToken } from "../utils/sendToken.js";

export const signup = async (req, res, next) => {
    try{
        const {name, username, email , password, confirmPassword} = req.body;

        const userExist = await User.findOne({email: email});
    
        if(userExist) return next({message: "Email is already used", status: 401})
    
    
        if(password !== confirmPassword)  return next({message: "password does not matched", status: 401})
    
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            username,
            avatar : {
                public_id: `https://api.dicebear.com/5.x/initials/svg?seed=${name}`, 
                url : `https://api.dicebear.com/5.x/initials/svg?seed=${name}` 
            }
        })
    
    
        sendToken(res, user , "User registered successfully");
    }
    catch(err)
    {
        console.error(err)
        return next({message: "User cannot be registered", status: 500})
    }
}


export const login = async (req, res, next) => {
   try{
    const {username, password} = req.body;

    const user = await User.findOne({username: username}).select("+password");   //as we have added an attribute in the schema to not select the password while fetching user so we have to explictly select the password

    if(!user)  return next({message: "User is not registered", status: 401})
 
    // Compare hashed password
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) return next({message: "Password is incorrect", status: 401})
    
    sendToken(res, user, "User logged in successfully");

   }
   catch(err)
   {
      console.error(err)
      return next({message: "Login failed", status: 500})
   }
}


export const userProfile = async (req, res, next) => {
    try{
        const userId = req.user._id;

        const user = await User.findById(userId);

        if(!user) return next({message: "User is not found", status: 404});

        return res.status(200).json({
            success : false,
            message : "User detials send successfully",
            user
        })
    }
    catch(error)
    {
        console.error(error);
        return next({});
    }
}


export const logout = async (req, res) => {
    res.status(200).cookie("token", "" , {
        maxAge  : 0 ,
        sameSite : "none",
        httpOnly : true,
        secure :  true
     }).json({
        success : true,
        message : "User logout successfully"
    })
}