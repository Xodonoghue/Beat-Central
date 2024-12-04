import express from 'express'
import {getUser, deleteAccount, updateUser} from "../controllers/user.js"
import verifyToken from '../utils/verifyToken.js'
import { verifyUserDirect } from '../utils/verifyUser.js'

const router = express.Router()

router.post("/update", updateUser)

router.get("/get/:id", getUser)

router.delete("/delete/:id", verifyToken, verifyUserDirect, deleteAccount)

export default router