import User from "../models/User.js";
import bcrypt from "bcrypt"
import { sendToken } from "../utils/sendToken.js";

export const signup = async (req, res) => {
    try{
        const {name, username, email , password, confirmPassword} = req.body;

        const userExist = await User.findOne({email: email});
    
        if(userExist)
        {
            return res.status(401).json({
                success: false,
                message : "Email is already used"
            })
        }
    
    
        if(password !== confirmPassword)
        {
            return res.status(401).json({
                success : false,
                message : "passwords don't matched"
            })
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            username,
            avatar : `https://api.dicebear.com/5.x/initials/svg?seed=${name}` 
        })
    
    
        sendToken(res, user , "User registered successfully");
    }
    catch(err)
    {
        console.error(err)
        return res.status(500).json({
            success : false,
            message: "User cannot registered"
        })
    }
}


export const login = async (req, res) => {
   try{
    const {username, password} = req.body;


    const user = await User.findOne({username: username}).select("+password");   //as we have added an attribute in the schema to not select the password while fetching user so we have to explictly select the password

    if(!user)
    {
        return req.status(404).json({
            success: false,
            message : "invalid username"
        })
    }
 
    // Compare hashed password
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
        return res.status(400).json({
            success : false,
            message : "Password is incorrect"
        })
    }
    
    sendToken(res, user, "User logged in successfully");

   }
   catch(err)
   {
      console.error(err)
      res.status(401).json(
        {
            success : false,
            message : "login failed"
        }
      )
   }
}