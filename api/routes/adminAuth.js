import express from "express"
import { createUser, deleteUser, updateUser } from "../controllers/adminAuth.js";
const router = express.Router();

router.post("/create-user", createUser)

router.post("/update-user", updateUser)

router.delete("/delete/:id", deleteUser)

export default router