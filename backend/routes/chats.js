import express from "express"
import { newGroupChat } from "../controllers/chats.js";
import { isAuthenticated } from "../middlewares/auth.js";
const router = express.Router();



router.use(isAuthenticated);


router.post("/new-group", newGroupChat);




export default router;