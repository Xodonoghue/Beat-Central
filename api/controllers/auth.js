import bcrypt from "bcrypt"
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken"
import {auth, db, storage} from "../../api/utils/firebase.js"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { setDoc, addDoc, doc, getDoc, updateDoc, deleteDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { deleteUser } from "firebase/auth"
import multer from "multer"
import axios from 'axios'
import ffmpeg from 'fluent-ffmpeg';
import path  from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

export const register = async (req,res,next) => {
        try {
        const userDoc = await createUserWithEmailAndPassword(auth, req.body.email, req.body.password)
        await setDoc(doc(db, "users", userDoc.user.uid), {
            ...req.body,
            beats: [], 
            timestamp: serverTimestamp()
          })
        res.status(200).send("User has been created")
         } catch(e){
            console.log(e)
         }
    
}

export const login = async (req,res,next) => {
    try {
        console.log(req.body)
        const userDoc = await signInWithEmailAndPassword(auth, req.body.email, req.body.password)
        if (userDoc) {
            const token = jwt.sign({id:userDoc.user.uid}, process.env.JWT)
            res.cookie("bc_access_token", token, {httpOnly:true,sameSite:'Lax'})
            res.status(200).send(userDoc.user)
        }
        console.log(userDoc.user)
            
    } catch(e) {
        console.log(e)
        if (e.code.includes("invalid-credential")) {
            next(createError(401,"Invalid username or password"))
        } else {
            next(createError(400, "Error signing in"))
        }
    }
}

export const uploadMp3 = async(req,res,next) => {
    try {
        const uploadedFile = req.file;
        console.log(uploadedFile)
        const name = new Date().getTime() + uuidv4()
        console.log(name)
        const metadata = {
            contentType: 'audio/mpeg',
        };
        const storageRef = ref(storage, `mp3-files/${name}.mp3`);
        const uploadTask = uploadBytesResumable(storageRef, uploadedFile.buffer, metadata);

        uploadTask.on('state_changed', 
        (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
            case 'paused':
                console.log('Upload is paused');
                break;
            case 'running':
                console.log('Upload is running');
                break;
            }
        }, 
        (error) => {
        }, 
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            res.status(200).send(downloadURL)
            });
        }
        );
        } catch(e){
            console.log(e)
        }
}

export const uploadWav = async(req,res,next) => {
    try {
        const uploadedFile = req.file;
        console.log(uploadedFile)
        const name = new Date().getTime() + uuidv4()
        console.log(name)
        const metadata = {
            contentType: 'audio/wav',
        };
        const storageRef = ref(storage, `wav-files/${name}.wav`);
        const uploadTask = uploadBytesResumable(storageRef, uploadedFile.buffer, metadata);

        uploadTask.on('state_changed', 
        (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
            case 'paused':
                console.log('Upload is paused');
                break;
            case 'running':
                console.log('Upload is running');
                break;
            }
        }, 
        (error) => {
            // Handle unsuccessful uploads
        }, 
        () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            res.status(200).send(downloadURL)
            });
        }
        );
        } catch(e){
            console.log(e)
        }
}

export const uploadImg = async(req,res,next) => {
    try {
    const uploadedFile = req.file;
    console.log(uploadedFile)
    const rand = Math.random() * 1000
    const name = new Date().getTime() + uuidv4()
    const metadata = {
        contentType: 'image/jpeg',
    };
    const storageRef = ref(storage, `cover-imgs/${name}.jpeg`);
    const uploadTask = uploadBytesResumable(storageRef, uploadedFile.buffer, metadata);
    uploadTask.on('state_changed', 
        (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
            case 'paused':
                console.log('Upload is paused');
                break;
            case 'running':
                console.log('Upload is running');
                break;
            }
        }, 
        (error) => {
            // Handle unsuccessful uploads
        }, 
        () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            res.status(200).send(downloadURL)
            });
        }
        );
    } catch(e) {
        console.log(e)
    }
}


export const exchangeCodeForToken = async (req,res,next) => {
    const redirectUri = 'http://localhost:5173/account';
  
    try {
      const response = await axios.post('https://oauth2.googleapis.com/token', {
        client_id: process.env.clientId,
        client_secret: process.env.clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
        code: req.query.code, // Authorization code received from the redirect
        access_type:'offline',
        prompt:'consent'
      });
      console.log(response.data)
      console.log('Access Token:', response.data.access_token);
      console.log('Refresh Token:', response.data.refresh_token);
      res.status(200).send(response.data)
    } catch (error) {
      console.error('Error exchanging code for token:', error.response?.data || error.message);
    }
  };

export const accessFromRefreshToken = async(req,res,next) => {
    try {
        const response = await axios.post('https://oauth2.googleapis.com/token', {
        client_id: process.env.clientId,
        client_secret: process.env.clientSecret,
        grant_type: 'refresh_token',
        refresh_token: req.query.token, // The refresh token you received
        });
        console.log(response.data)
        res.status(200).send(response.data)
    } catch(e) {
        console.log(e)
    }
}