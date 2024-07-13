import express from "express"
import { addMembers, deleteGroup, getChatDetails, getChatMessages, getUserAllChats, leaveGroup, newGroupChat, removeMember, renameGroup, sendAttachments } from "../controllers/chats.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { attachmentMulter } from "../middlewares/multer.js";
const router = express.Router();



router.use(isAuthenticated);


router.post("/new-group", newGroupChat);
router.get("/all-chats", getUserAllChats);
router.put("/add-members", addMembers);
router.put("/remove-member", removeMember);
router.put("/leave", leaveGroup);
router.post("/send-attachments", attachmentMulter, sendAttachments);
router.get("/messages/:id", getChatMessages);

// router to get , rename and delete chat 
router.route("/:id").get(getChatDetails).put(renameGroup).delete(deleteGroup);




export default router;