import express from "express"
import { login, register, uploadMp3, uploadWav, exchangeCodeForToken, accessFromRefreshToken, uploadImg } from "../controllers/auth.js";
import multer from "multer";
import verifyToken from "../utils/verifyToken.js";
import { verifyUserDirect } from "../utils/verifyUser.js";

const router = express.Router();

const storage = multer.memoryStorage();

const uploadTemp = multer({ storage: storage, limits: { fileSize: 100 * 1024 * 1024 } });

router.get("/check-auth", verifyToken, (req,res,next) => res.send("User confirmed"))

router.post("/register", register)

router.post("/login", login)

router.post("/upload-mp3", verifyToken, uploadTemp.single('file'), uploadMp3)

router.post("/upload-wav", verifyToken, uploadTemp.single('file'), uploadWav)

router.post("/upload-img", verifyToken, uploadTemp.single('file'), uploadImg)

router.get("/token", exchangeCodeForToken)

router.get("/refresh", accessFromRefreshToken)

router.get("/", (req,res) => {res.send("200")})

export default router