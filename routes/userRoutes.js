import { signUp,login } from "../controllers/userController.js";

import express from "express";
const router = express.Router();
 
router.post("/register",signUp);
router.post("/login",login);

export default router;



