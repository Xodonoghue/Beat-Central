import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { resolve } from 'path';
import os from 'os';
import { Readable } from 'stream'; 
import { setDoc, addDoc, doc, getDoc, updateDoc, deleteDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, uploadBytesResumable, getDownloadURL,getStream } from "firebase/storage";
import { storage } from '../utils/firebase.js';
import ffmpeg from 'fluent-ffmpeg';
import axios from 'axios'
import {accessFromRefreshToken} from './auth.js'
import { createError } from '../utils/error.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


async function convertReadableStreamToNodeStream(readableStream) {
    const reader = readableStream.getReader();
  
    return new Readable({
      async read() {
        const { done, value } = await reader.read();
        if (done) {
          this.push(null);
        } else {
          this.push(value);
        }
      },
    });
  }

async function formatMp3(fileName,filePath)  {
    const newName = `formatted-${fileName}`
    const tempDir = os.tmpdir();
    const newPath = path.join(tempDir, newName);
    const promise = await new Promise((resolve,reject) => {
        ffmpeg(filePath)
        .output(newPath)
        .audioCodec('libmp3lame')
        .audioQuality(2)
        .on('end', () => {
            resolve(newPath)
        })
        .on('error', (err) => {
            reject(err)
        })
        .run();
    })
    return promise
}

async function formatJpeg(fileName,filePath) {
    const newName = `formatted-${fileName}`
    const tempDir = os.tmpdir();
    const newPath = path.join(tempDir, newName);
    const promise = await new Promise((resolve,reject) => {
        try {
            ffmpeg(filePath)
            .output(newPath)
            .format('mjpeg')
            .outputOptions(['-q:v 2'])
            .on('end', () => {
                resolve(newPath)
            })
            .on('error', (err) => {
                reject(newPath)
            })
            .run();
        } catch(e) {
            reject(e)
        }
    })
    return promise
}

async function saveStreamToTemp(fileStream, fileName) {
    console.log(`file name: ${fileName}`)
    const tempDir = os.tmpdir();
    const tempFilePath = path.join(tempDir, fileName);
    const nodeStream = await convertReadableStreamToNodeStream(fileStream);
    console.log(`temp path: ${tempFilePath}`)
    return new Promise((resolve, reject) => {
      const writeStream = fs.createWriteStream(tempFilePath);
  
      nodeStream
        .pipe(writeStream)
        .on('finish', () => {
          console.log(`File saved to ${tempFilePath}`);
          resolve(tempFilePath);
        })
        .on('error', (err) => {
          reject(err);
        });
    });
  }


async function downloadFile(filePath, destination) {
    try {
        const pathReference = ref(storage, filePath);
        const file = getStream(pathReference)
        const tempFilePath = await saveStreamToTemp(file, destination)
        let formattedFilePath
        if (destination.includes(".mp3")) {
            formattedFilePath = await formatMp3(destination,tempFilePath)
        } else if (destination.includes(".jpeg")){
            formattedFilePath = await formatJpeg(destination,tempFilePath)
        } else {
            throw(new Error("Invaild type"))
        }
        console.log(`formatted to: ${formattedFilePath}`)
        return formattedFilePath
    } catch(e) {
        console.log(e)
    }
  }

async function createMedia(imagePath, audioPath, outputPath) {
    const vidUrl = await new Promise((resolve,reject) => {
        ffmpeg()
        .input(imagePath)
        .loop()
        .input(audioPath)
        .videoFilters([
            "scale='if(gt(iw/ih,16/9),1920,-1)':'if(gt(iw/ih,16/9),-1,1080)'",
            'pad=1920:1080:(ow-iw)/2:(oh-ih)/2:color=black',
          ])
        .audioCodec('aac')
        .videoCodec('libx264') 
        .outputOptions('-shortest')
        .on('start', (commandLine) => {
        console.log('FFmpeg process started with command:', commandLine);
        })
        .on('progress', (progress) => {
        console.log(`Processing: ${progress.percent}% done`);
        })
        .on('end', async () => {
        console.log('Video file created successfully:');
        try{
            const url = await uploadVideo(outputPath)
            console.log(`Video file uploaded successfully:${url}`);
            resolve(outputPath)
        } catch(e){ 
            console.log(e)
            reject(e)
        }
        })
        .on('error', (err) => {
        reject(err)
        })
        .save(outputPath);
    })
    return(vidUrl)
    }

async function uploadVideo(filePath) {
    return new Promise((resolve, reject) => {

    const fileBuffer = fs.readFileSync(filePath);
    try{
        const metadata = {
            contentType: 'video/mp4',
        };
        const storageRef = ref(storage, `vids/test-vid-2.mp4`);
        const uploadTask = uploadBytesResumable(storageRef, fileBuffer, metadata);

        uploadTask.on('state_changed', 
        (snapshot) => {
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
            reject(error)
        }, 
        async () => {
            const vidUrl = await getDownloadURL(uploadTask.snapshot.ref)
            resolve(vidUrl)
        }
    );
    
    } catch(e){
        console.log(e)
        reject(e)
    }
    })   
    
}
      

  
async function downloadFiles(audioFile, imgFile) {
    const audioName = audioFile.split("/")[1]
    const imgName = imgFile.split("/")[1]
    const outputName = audioName.split(".")[0]
    const tempDir = os.tmpdir(); 
    const outputPath = path.join(tempDir, `${outputName}.mp4`);
    const imagePath = await downloadFile(imgFile, imgName);
    const audioPath = await downloadFile(audioFile, audioName);
    const vidUrl = await createMedia(imagePath,audioPath,outputPath)
    return vidUrl
}
  

  
export const createVideo = async (req,res,next) => {
    const audioFile = req.body.audio
    const imgFile = req.body.img
    const vidUrl = await downloadFiles(audioFile,imgFile)
    console.log(vidUrl)
};

export const uploadVideoToYouTube = async (req,res,next) => {
    try {
    const accessRes = await axios.get(`http://localhost:7001/api/auth/refresh?token=${req.body.refreshToken}`)
    const accessToken = accessRes.data.access_token 
    const videoFilePath = await downloadFiles(req.body.audio, req.body.img);
    console.log(accessToken,videoFilePath)

    const metadata = {
        snippet: {
          title: req.body.title,
          description: 'This is the description of my awesome video.',
          tags: ['music', 'type beat'],
          categoryId: '10',
        },
        status: {
          privacyStatus: 'private',
        },
      };
  
    const response = await axios.post(
        'https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status',
        metadata,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      const uploadUrl = response.headers['location'];
      await axios.put(
        uploadUrl,
        fs.createReadStream(videoFilePath),
        {
          headers: {
            'Content-Type': 'video/mp4',
            'Content-Length': fs.statSync(videoFilePath).size,
          },
        }
      );
      res.status(200).send('Video uploaded successfully!')
    } catch(e) {
        next(createError(400,e.message))
    }
}
  