import express from "express"
import { addMembers, getUserAllChats, newGroupChat, removeMember } from "../controllers/chats.js";
import { isAuthenticated } from "../middlewares/auth.js";
const router = express.Router();



router.use(isAuthenticated);


router.post("/new-group", newGroupChat);
router.get("/all-chats", getUserAllChats);
router.put("/add-members", addMembers);
router.put("/remove-member", removeMember);




export default router;