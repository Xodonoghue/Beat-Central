import { setDoc, addDoc, doc, getDoc, getDocs, where, deleteDoc, collection, query, serverTimestamp } from "firebase/firestore";
import {db} from "../utils/firebase.js"
import { createError } from "../utils/error.js";

export async function createBeat(req,res,next) {
    try {
        const docRef = await addDoc(collection(db, "beats"), {
            ...req.body,
            timestamp: serverTimestamp()
        })
        const userRef = await doc(db, "users", req.body.user);
        const userSnap = await getDoc(userRef)
        const userData = userSnap.data()
        const beats = [...userData.beats,docRef.id]
        userData.beats = beats
        await setDoc(doc(db,"users",req.body.user), {
            ...userData
        })
        res.send(userData)
    } catch (e) {
        next(createError(400,e.message))
    }
}

export async function deleteBeat(req,res,next) {
    try {
        const beatRef = await doc(db,"beats", req.params.id)
        const beatSnap = await getDoc(beatRef)
        const beatData = beatSnap.data()
        await deleteDoc(doc(db,"beats",req.params.id))
        console.log(beatData)
        const userRef = await doc(db, "users", beatData.user)
        const userSnap = await getDoc(userRef)
        const userData = userSnap.data()
        const beats = userData.beats.filter((item) => item !== req.params.id)
        userData.beats = beats
        await setDoc(doc(db,"users",beatData.user), {
            ...userData
        })
        res.status(200).send("beat deleted")
    }catch(e){
        next(createError(400,e.message))
    }
}

export const updateBeat = async (req,res,next) => {
    try {
        const {id, ...otherDetails} = req.body
        setDoc(doc(db,"beats", id), {
            ...otherDetails
        })
        res.status(200).send("beat updated")
    }catch(e){
        next(createError(400,e.message))
    }
}

export const getBeats = async (req,res,next) => {
    try {
        const q = query(collection(db, "beats"), where("user", "==", req.params.id));
        const querySnap = await getDocs(q)
        let beatObjects = []
        querySnap.forEach(async (beat) => {
            beatObjects.push({...beat.data(),id:beat.id})
        })
        res.send(beatObjects)
    } catch(e) {
        next(createError(400, e.message))
    }
}

export const getBeat = async (req,res,next) => {
    try{
        const docRef = doc(db, "beats", req.params.id)
        const docSnap = getDoc(docRef)
        const data = (await docSnap).data()
        res.status(200).send(data)
    } catch(e) {
        next(createError(400,e.message))
    }
   
}