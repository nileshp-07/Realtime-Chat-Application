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
