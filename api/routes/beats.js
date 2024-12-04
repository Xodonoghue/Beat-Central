import express from "express"
import { createBeat,deleteBeat,getBeats,getBeat } from "../controllers/beat.js";
import verifyToken from "../utils/verifyToken.js";
import {verifyUserDirect,verifyUserIndirect} from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create-beat", createBeat)

router.delete("/delete-beat/:id", verifyToken, verifyUserIndirect, deleteBeat)

router.get("/all/:id", getBeats)

router.get("/single/:id", getBeat)

export default router