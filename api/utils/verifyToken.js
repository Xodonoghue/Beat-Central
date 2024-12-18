import jwt from "jsonwebtoken"
import { createError } from "./error.js"

export default function verifyToken(req,res,next) {
    const token = req.cookies?.bc_access_token
    console.log(req.cookies)
    if (!token) {return next(createError(401,"You are not authenticated"))}

    jwt.verify(token,process.env.JWT, (err,user)=>{
        if (err) {
            return next(createError(403,"Token is not valid"))
        }
        req.user = user
        next()
    })
}