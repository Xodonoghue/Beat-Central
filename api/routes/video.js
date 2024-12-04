import express from "express";
import { createVideo, uploadVideoToYouTube } from "../controllers/video.js";

const router = express.Router()

router.post('/create', createVideo)

router.post('/youtube', uploadVideoToYouTube)

export default router