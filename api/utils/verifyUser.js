import { createError } from "./error.js"
import jwt from "jsonwebtoken"
import {auth, db, storage} from "../../api/utils/firebase.js"
import { setDoc, addDoc, doc, getDoc, updateDoc, deleteDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export async function verifyUserIndirect(req,res,next) {
    try {
    const token = req.cookies.bc_access_token
    const decodedToken = jwt.decode(
        token,
        process.env.JWT,
    )
    console.log(decodedToken)
    const docRef = doc(db, "beats", req.params.id)
    const docSnap = await getDoc(docRef)
    const data = docSnap.data()
    if (decodedToken.id === data.user) {
        next()
    } else {
        next(createError(403,"You're not authorized to perform this function"))
    }
    } catch(e) {
        next(e)
    }
}

export async function verifyUserDirect(req,res,next) {
    try {
    const token = req.cookies.bc_access_token
    const decodedToken = jwt.decode(
        token,
        process.env.JWT,
    )
    if (decodedToken.id === req.params.id) {
        next()
    } else {
        next(createError(403,"You're not authorized to perform this function"))
    }
    } catch(e) {
        next(e)
    }
}