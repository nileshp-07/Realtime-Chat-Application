import express from "express";
const router = express.Router(); 
import {z} from "zod"
import validateSchema from "../middlewares/validateSchema.js"
import { login, signup } from "../controllers/auth.js";

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


export default router;