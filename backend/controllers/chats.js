import Chat from "../models/Chat.js"

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