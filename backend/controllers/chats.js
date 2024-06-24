import Chat from "../models/Chat.js"
import User from "../models/User.js";
import Message from "../models/Message.js"

export const newGroupChat = async (req, res, next) => {
    try{
        const {name, members} = req.body;
        const userId = req.user._id;

        if(members.length < 2)  return next({message: "min 3 member required to create group", status : 402});

        const allMembers = [...members, userId];

        console.log(allMembers);

        await Chat.create({
            name,
            members : allMembers,
            isGroup : true,
            admin : userId
        })

        // eventEmitter function to be added 


        res.status(200).json({
            success : true,
            message : "Group Created"
        })
    }
    catch(error)
    {
        console.error(error);
        return next({message: "Group could not be created", status: 500})
    }
}


export const getUserAllChats = async (req,res, next) => {
    try{
        const userId = req.user._id;

        console.log(userId);

        const allChats = await Chat.find({members: userId})
                                                .populate("members",
                                                    "avatar name"     // selecting the field from populated
                                                );
        
        return res.status(200).json({
            success: false,
            message : "All chats of user is returned",
            allChats
        })
    }
    catch(error)
    {
        console.error(error);
        return next({message: "User chats could not be returned", status: 500})
    }
}


export const addMembers = async (req, res, next) => {
    try{
        const {chatId, members} = req.body;
        const userId = req.user._id;

        if(!members || members.length < 1) return next({message: "No members to add", status: 404});

        const chat = await Chat.findById(chatId);

        if(!chat) return next({message : "Chat not found", status: 404});
        if(!chat.isGroup) return next({message : "it is not a group", status: 401});
        if(chat.admin.toString() !== userId.toString())  return next({message:"User is not an admin" , status: 403})
        
        //if user is already present in the group
        const existingMemberIds = chat.members.map(member => member.toString());
        let isMemberAlreadyExist;
        for (const member of members) {
            if (existingMemberIds.includes(member)) {
                isMemberAlreadyExist = true;
                break; // Break out of the loop if member already exists
            }
        }
        if(isMemberAlreadyExist) return  next({message: `User is already in the group`})


        chat.members = [...chat.members, ...members];

        if(chat.members.length >= 100)  return next({message : "Maximum members limit reached", status: 402});

        chat.save();

        // eventEmitter function to be added 


        return res.status(200).json({
            success : true,
            message : "Members add to the Group"
        })

    }
    catch(err)
    {
        console.error(err);
        return next({message: "Members could not be added into the group", status: 401});
    }
}


export const removeMember = async (req, res, next) => {
    try{
        const {chatId, memberId} =  req.body;
        const userId = req.user._id;

        const chat = await Chat.findById(chatId);

        if(!chat) return next({message : "Chat not found", status: 404});
        if(!chat.isGroup) return next({message : "it is not a group", status: 401});
        if(chat.admin.toString() !== userId.toString())  return next({message:"User is not an admin" , status: 403})


        const memberIndex = chat.members.findIndex(member => member.toString() === memberId);

        if(!memberIndex)  return next({message: "Member is not found in the group", status: 404});

        // now remove the member
        chat.members.splice(memberIndex, 1);

        chat.save();

        // eventEmitter function to be added 

        return res.status(200).json({
            success: true,
            message : "Member removed from the group"
        })

    }
    catch(err)
    {
        console.error(err);
        return next({message: "Members could not be removed from the group", status: 401});
    }
}


export const leaveGroup = async (req, res, next) => {
    try{
        const {chatId, userId} = req.body;

        console.log(chatId, "  ", userId)

        const chat = await Chat.findById(chatId);

        if(!chat) return next({success: "Chat not found!", status: 404});

        if(!chat.isGroup)  return next({success: "this chat is not a group" , status:403});


        const remainingMembers = chat.members.filter(memberId => memberId.toString() !== userId.toString());

        // handle the case if the admin leave a group, so assign a new admin 
        if(chat.admin.toString() === req.user._id.toString())
        {
            const randomIndex = Math.floor(Math.random()*remainingMembers.length);

            const newAdmin = remainingMembers[randomIndex];

            chat.admin = newAdmin;
        }

        
        
        chat.members = remainingMembers;

        chat.save();

        // eventEmitter function to be added 

        return res.status(200).json({
            success : false,
            message : "Member leaves the group successfully",
        })

    }
    catch(err)
    {
        console.error(err)
        return next({message: "Could not leave the group" , status : 403})
    }
}



export const sendAttachments = async(req, res, next) => {
    try{
        const {chatId} = req.body;
        const userId = req.user._id

        const files = req.files || [];

        if(files.length < 1)  return next({message: "Attachment Not found" , status: 404});

        const [user, chat] = await Promise.all([
            User.findById(userId, "name"),  //find the user and selecting his name
            Chat.findById(chatId)
        ])

        if(!chat) return next({message: "Chat not found", status: 404});

        // update files to clodinary 
        const attachmentLinks = ["attachment1", "attachment2"];

        const message  = await Message.create({
            content: "", //no content in case of attachments
            sender : userId,
            chat : chatId,
            attachments : attachmentLinks
        })

        const messageForRes = {
            ...message,
            sender: {
                _id: user._id,
                name : user.name
            }
        }

        // eventEmitter function to be added 

        return res.status(200).json({
            success: true,
            message : "Attachments sent successfully",
            messageForRes
        })
    }
    catch(err)
    {
        console.error(err)
        return next({messsage : "Error while sending attachments", status: 400});
    }
}


export const getChatDetails = async (req, res, next) => {
    try{
        const chatId = req.params.id;

        const chatDetails = await Chat.findById(chatId).populate("members").exec();

        if(!chatDetails) return next({message: "Chat not found", status: 404});

        return res.status(200).json({
            success : true,
            message : "Chat details fetched",
            chatDetails
        })
    }
    catch(err)
    {
        console.error(err);
        return next({message: "Chat details could not be fetched"});
    }
}


export const renameGroup = async (req, res, next) => {
    try{
        const chatId  = req.params.id;
        const {newName} = req.body;

        const chat = await Chat.findById(chatId);

        if(!chat) return next({message: "Chat not found!", status: 404});

        if(!chat.isGroup)  return next({message: "this is not a group", status:400});

        if(chat.admin.toString() !== req.user._id) return next({message: "Only Admin Can change the group name", status: 400});


        chat.name = newName;

        await chat.save();


        // eventEmitter function to be added 


        return res.status(200).json({
            success: true,
            message : "Group has be re-named"
        })
    }
    catch(err)
    {
        console.error(err);
        return next({message: "Group name could not be changed"});
    }
}