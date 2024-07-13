import jwt from "jsonwebtoken"
import User from "../models/User.js";

const isAuthenticated = (req, res, next) => {
    const token = req.cookies.token ||
                    req.body.token  ||
                    req?.header("Authorization")?.replace("Bearer ", "");


    if(!token){
        return res.status(401).json({
            success: false,
            message : "Token is not found, please login first"
        })
    }

    const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decodedPayload;
    next();
}

const socketAuthenticator = async (socket, next) => {
    try{
        const token = socket.handshake.auth.token;

        if(!token)
            return next({message: "Please login to access this route", status: 401});

        const decodedData = jwt.verify(token , process.env.JWT_SECRET)

        const user = await User.findById(decodedData._id)

        if(!user)
            return next({message: "Please login to access this route", status: 401});

        socket.user = user;

        next();
    }
    catch(err)
    {
        console.log(err);
        return next(new ErrorHandler("Could not authenticate the socket", 401));
    }
}


export {isAuthenticated, socketAuthenticator};   //another way to export