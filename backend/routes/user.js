import express from "express";
const router = express.Router(); 
import validateSchema from "../middlewares/validateSchema.js"
import { login, logout, signup, userProfile } from "../controllers/auth.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { acceptRequest, getMyNotifications, myFriends, searchUser, sendRequest } from "../controllers/user.js";
import { acceptRequestSchema, loginSchema, searchFriendSchema, sendRequestSchema, signupSchema, } from "../lib/validators.js";


router.post("/signup" ,validateSchema(signupSchema), signup)
router.post("/login" , validateSchema(loginSchema), login)


router.use(isAuthenticated) // so adding a middleware for authentication which will be apply on all the below routes


router.get("/user-profile", userProfile);
router.get("/logout", logout);
router.get("/search",validateSchema(searchFriendSchema), searchUser);
router.post("/sendrequest", validateSchema(sendRequestSchema), sendRequest);
router.post("/acceptRequest", validateSchema(acceptRequestSchema), acceptRequest);
router.get("/notifications", getMyNotifications);
router.get("/friends", myFriends);


export default router;