import express from "express"
import { addMembers, getChatDetails, getUserAllChats, leaveGroup, newGroupChat, removeMember, renameGroup, sendAttachments } from "../controllers/chats.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { attachmentMulter } from "../middlewares/multer.js";
const router = express.Router();



router.use(isAuthenticated);


router.post("/new-group", newGroupChat);
router.get("/all-chats", getUserAllChats);
router.put("/add-members", addMembers);
router.put("/remove-member", removeMember);
router.delete("/leave", leaveGroup);
router.post("/send-attachments", attachmentMulter, sendAttachments);


// router to get , rename chat 
router.route("/:id").get(getChatDetails).put(renameGroup);




export default router;