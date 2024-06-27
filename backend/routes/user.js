import express from "express";
const router = express.Router(); 
import {z} from "zod"
import validateSchema from "../middlewares/validateSchema.js"
import { login, logout, signup, userProfile } from "../controllers/auth.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { acceptRequest, getMyNotifications, myFriends, searchUser, sendRequest } from "../controllers/user.js";

const signupSchema = z.object({
    name : z.string(),
    username : z.string().min(5).max(12),
    email : z.string().email("invalid email address").optional(),
    password : z.string(),
})

const loginSchema = z.object({
    username : z.string().min(5).max(12),
    password : z.string()
})


router.post("/signup" ,validateSchema(signupSchema), signup)
router.post("/login" , validateSchema(loginSchema), login)


router.use(isAuthenticated) // so adding a middleware for authentication which will be apply on all the below routes


router.get("/user-profile", userProfile);
router.get("/logout", logout);
router.get("/search", searchUser);
router.post("/sendrequest", sendRequest);
router.post("/acceptRequest", acceptRequest);
router.get("/notifications", getMyNotifications);
router.get("/friends", myFriends);


export default router;