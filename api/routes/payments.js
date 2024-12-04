import express from "express";
import { createIntent } from "../controllers/payments.js";
import verifyToken from "../utils/verifyToken.js";

const router = express.Router()

router.post("/intent", verifyToken, createIntent)

export default router