import { Request } from "../models/Request.js";
import User from "../models/User.js";
import Chat from "../models/Chat.js"
import { emitEvent } from "../utils/features.js";
import { NEW_REQUEST } from "../constants/events.js";

export const searchUser = async (req, res) => {
    try{
        const {name} = req.query;
        const userId = req.user._id;
        const searchResult = await User.find({
            $or: [
                { name: new RegExp(name, 'i') },
                { username: new RegExp(name, 'i') }
              ]
        })

        const user = await User.findById(userId);

        if(!user)  return next({message: "User not found!", status: 404});


        // Extract IDs of current user's friends
        const friendIds = user.friends.map(friend => friend.toString());
        

        
        const users = searchResult.filter((user) => (
            user._id.toString() !== userId.toString()  && !friendIds.includes(user._id.toString())
        ))


        return res.status(200).json({
            success: true,
            message: "search result sent",
            users
        })

    }
    catch(err)
    {
        console.error(err)
        return next({message: "User could not be searched!!"})
    }
}


export const sendRequest = async (req , res, next) => {
    try{
        const {receiverId} = req.body;
        const senderId = req.user._id;


        const request = await Request.findOne({
            $or : [
                { sender : senderId, receiver : receiverId },
                { sender : receiverId, receiver : senderId },
            ]
        })

        if(request) return next({message: "Request already sent", status: 400});


        await Request.create({
            sender : senderId,
            receiver : receiverId
        })


        // eventEmitter function to be added 
        emitEvent(req, NEW_REQUEST ,[receiverId])



        return res.status(200).json({
            success: true,
            message : "Friend request sent successfully"
        })
    }
    catch(err)
    {
        console.error(err)
        return next({message: "Friend request can't be sent", status: 411});
    }
} 

export const acceptRequest = async (req, res, next) => {
    try{
        const {senderId, requestId, isAccepted} = req.body;
        const receiverId = req.user._id;

        
        const request = await Request.findById(requestId)
                                                .populate("sender", "name")
                                                .populate("receiver", "name");
       
        if(!request) return next({message: "Request not found", status: 404});

        if(request.receiver._id.toString()  !==  receiverId.toString())  return next({message: "You cannot accept the request", status: 401})


        if(!isAccepted)  //friend request is rejected
        {
            request.deleteOne();

            return res.status(200).json({
                success: true,
                message : "Friend request rejected"
            })
        }


        const members = [request.sender._id, request.receiver._id];


        await Promise.all([
            // 1. create chat
            Chat.create({
                name : `${request.sender.name}-${request.receiver.name}`,
                members,
            }),

            // 2. delete request
            request.deleteOne(),


            // 3. add receiverId into sender's friendlist
            User.findByIdAndUpdate(senderId,{
                $push : {
                    friends: receiverId
                }
            }),


            // 4.  add senderId into receiver's friendlist
            User.findByIdAndUpdate(receiverId, {
                $push:{
                    friends : senderId
                }
            })
        ])

        // eventEmitter function to be added 


        return res.status(200).json({
            success: true,
            message : "Friend request Accepted",
            sender :  senderId
        })

    }
    catch(error)
    {
        console.error(error);
        return next({message: "Error while accepting friend request", status: 400})
    }
}


export const getMyNotifications = async (req, res , next) => {
    try{
        const userId = req.user._id;

        const requests = await Request.find({
            receiver: userId
        })
        .populate("sender" , "avatar name username");

        return res.status(200).json({
            message: "All Notifications fetched successfully",
            requests,
        })
    }
    catch(err)
    {
        console.error(err);
        return next({message: "Error while fetching Notifications"});
    }
}



export const myFriends = async (req, res, next) => {
    try{
        const userId = req.user._id;

        const user = await User.findById(userId).populate("friends");

        if(!user) return next({message:"User not found" , status: 404});

        return res.status(200).json({
            success: true,
            message: "all friends are fetched successfully",
            friends : user.friends
        })
    }
    catch(err)
    {
        console.error(err);
        return next({message: "Error while fetching your friends"});
    }
}