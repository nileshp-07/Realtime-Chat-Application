import express from "express"
import { addMembers, deleteGroup, getChatDetails, getChatMessages, getUserAllChats, leaveGroup, newGroupChat, removeMember, renameGroup, sendAttachments } from "../controllers/chats.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { attachmentsMulter } from "../middlewares/multer.js";
import validateSchema from "../middlewares/validateSchema.js";
import { leaveGroupSchema, newGroupSchema, removeMemberSchema, renameGroupSchema } from "../lib/validators.js";
const router = express.Router();



router.use(isAuthenticated);


router.post("/new-group", validateSchema(newGroupSchema), newGroupChat);
router.get("/all-chats", getUserAllChats);
router.put("/add-members", validateSchema(addMembers), addMembers);
router.put("/remove-member",validateSchema(removeMemberSchema), removeMember);
router.put("/leave",validateSchema(leaveGroupSchema), leaveGroup);
router.post("/send-attachments", attachmentsMulter, sendAttachments);
router.get("/messages/:id", getChatMessages);

// router to get , rename and delete chat 
router.route("/:id").get(getChatDetails).put(validateSchema(renameGroupSchema), renameGroup).delete(deleteGroup);




export default router;