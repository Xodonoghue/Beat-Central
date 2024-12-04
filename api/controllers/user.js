import {auth, db, storage} from "../../api/utils/firebase.js"
import { setDoc, addDoc, doc, getDoc, updateDoc, deleteDoc, collection, serverTimestamp } from "firebase/firestore";
import { createError } from "../utils/error.js";


export const getUser = async (req,res,next) => {
    try{
        const userRef = doc(db, "users", req.params.id)
        const userSnap = await getDoc(userRef)
        if (userSnap) {
            res.status(200).send(userSnap.data())
        } else {
            next(createError(400,"Error retrieving user"))
        }
    } catch(e) {
        next(createError(400,e.message))
    }
    
}

export const deleteAccount = async (req,res,next) => {
    try {
        const userRef = await doc(db, "users", req.params.id)
        const userSnap = await getDoc(userRef)
        const userData = userSnap.data()
        console.log(userData)
        userData.beats.forEach(async(beat) => {
            await deleteDoc(doc(db,"beats", beat))
        });
        await deleteDoc(doc(db,"users",req.params.id))

        const user = auth.currentUser;
        console.log(user)

        deleteUser(user).then(() => {
        }).catch((error) => {
            console.log(error)
        });

        res.status(200).send("user deleted succesfully")
    } catch(e){
        next(createError(400,e.message))
    }
}

export const updateUser = async (req,res,next) => {
    try {
        const {id, ...otherDetails} = req.body
        updateDoc(doc(db,"users", id), {
            ...otherDetails
        })
        res.status(200).send("user updated")
    }catch(e){
        next(createError(400,e.message))
    }
}
