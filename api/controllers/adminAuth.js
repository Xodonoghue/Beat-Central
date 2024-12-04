import { createError } from "../utils/error.js";
import {auth, storage} from "../utils/firebaseAdmin.js"
import { db } from "../utils/firebase.js";
import { setDoc,doc,serverTimestamp,deleteDoc } from "firebase/firestore";

export const createUser = (req,res,next) => {
    auth.createUser({
        email: req.body.email,
        password: req.body.password,
    }).then(async (userDoc) => {
        console.log(userDoc)
        await setDoc(doc(db,"users",userDoc.uid), {
            ...req.body,
            beats: [], 
            timestamp: serverTimestamp()
        })
        res.status(200).send("user created")})
    .catch((error) => {next(createError(400,"Error creating user"))})
}

export const updateUser = (req,res,next) => {
    const {uid, ...userData} = req.body
    auth.updateUser(uid, userData)
      .then(async (userDoc) => {
        await setDoc(doc(db,"users",userDoc.uid), {
            ...req.body,
        })
        res.status(200).send("Successfully updated user")
      })
      .catch((error) => {
        next(createError(400,'Error updating user'));
      });
}

export const deleteUser = (req,res,next) => {
    auth.deleteUser(req.params.id)
    .then(async() => {
        await deleteDoc(doc(db,"users",req.params.id))
        res.status(200).send("User deleted succesfully")
    })
    .catch((error) => {
        next(createError(400,"Error deleting user:"));
    });
}