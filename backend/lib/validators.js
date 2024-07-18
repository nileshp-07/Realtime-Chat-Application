import {z} from "zod"

const signupSchema = z.object({
    name : z.string(),
    username : z.string().min(5).max(12),
    password : z.string(),
})

const loginSchema = z.object({
    username : z.string().min(5).max(12),
    password : z.string()
})

const searchFriendSchema = z.object({
    name: z.string()
})


const sendRequestSchema = z.object({
    receiverId : z.string()
})

const acceptRequestSchema = z.object({
    isAccepted : z.boolean(),
    requestId : z.string(),
    senderId: z.string()
})

const newGroupSchema = z.object({
    name : z.string(),
    members : z.array(z.string())
})


const addMembersSchema = z.object({
    chatId : z.string(),
    members : z.array(z.string())
})


const removeMemberSchema = z.object({
    chatId : z.string(),
    memberId : z.string()
})


const leaveGroupSchema = z.object({
    chatId : z.string()
})


const renameGroupSchema = z.object({
    newName : z.string()
})


export {signupSchema , loginSchema, searchFriendSchema, sendRequestSchema,acceptRequestSchema, newGroupSchema, addMembersSchema, removeMemberSchema, leaveGroupSchema, renameGroupSchema}