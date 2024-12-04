import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoute from "./routes/auth.js"
import beatRoute from "./routes/beats.js"
import adminAuthRoute from "./routes/adminAuth.js"
import paymentRoute from "./routes/payments.js"
import cookieParser from "cookie-parser"
import videoRoute from "./routes/video.js"
import userRoute from "./routes/users.js"
import multer from "multer"
import path from "path";
import cors from "cors"

const app = express()
dotenv.config()

app.use(cors({
    origin: 'http://localhost:5173', 
  }))
app.use(cookieParser())
app.use(express.json())
app.use("/api/auth", authRoute)
app.use("/api/beats", beatRoute)
app.use("/api/auth-admin", adminAuthRoute)
app.use("/api/payments", paymentRoute)
app.use("/api/video", videoRoute)
app.use("/api/users", userRoute)


app.listen(7001, ()=>{
}) 