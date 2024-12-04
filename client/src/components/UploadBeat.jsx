import { useState,useEffect, useContext } from "react"
import axios from "axios"
import { AuthContext } from "../../contexts/authContext";
import Loading from "./Loading";
import {DotLoader} from "react-spinners"
import Footer from "./Footer";
import UserNavbar from "./UserNavbar";
import useFetch from "../../hooks/useFetch";



const UploadBeat = () => {
    const {user,loading,error,dispatch} = useContext(AuthContext)
    const [formData, setFormData] = useState({})
    const [mp3, setMp3] = useState(null)
    const [coverImg, setCoverImg] = useState(null)
    const [uploads, setUploads] = useState([])
    const [wav, setWav] = useState(null)
    const [per, setPer] = useState(null)
    const [uploading, setUploading] = useState(false)
    const {data,reFetch} = useFetch(`/api/users/get/${user?.uid}`)

    const change = (e) => {
        const {name, value} =  e.target
        setFormData({...formData, [name]: value})
    }

    useEffect(() => {
        if (user) {
             reFetch(`/api/users/get/${user.uid}`)
        }
     },[user])

    const uploadFile = async () => {
        let mp3Url
        let wavUrl
        let imgUrl
        if (mp3) { 
            if (!(mp3.name in uploads)){
                try{
                    const fd = new FormData();
                    fd.append('file', mp3)
                    const res = await axios.post("/api/auth/upload-mp3", fd)
                    console.log(res.status)
                    if (res.status === 200) {
                        mp3Url = res.data
                    }
                    
                } catch(e){
                    throw(e)
                }
            }
        }
        if (wav) { 
            if (!(wav.name in uploads)){
                try{
                    const fd = new FormData();
                    fd.append('file', wav)
                    const res = await axios.post("/api/auth/upload-wav", fd)
                    console.log(res.status)
                    if (res.status === 200) {
                        wavUrl = res.data
                    }
                    
                } catch(e){
                    console.log(e)
                }
            }
        }
        if (coverImg){
            const fd = new FormData();
            fd.append('file', coverImg)
            const res = await axios.post('/api/auth/upload-img',fd)
            if (res.status === 200) {
                imgUrl = res.data
            }
        }
        
        return {...formData, mp3:mp3Url, wav:wavUrl, user:user?.uid, img:imgUrl}
    }

    const handleSubmit = async (e) => {
        const action = e.nativeEvent.submitter.value
        e.preventDefault()
        if (action === 'store') {
            handleSubmitStore();
        } else if (action === 'youtube') {
            handleSubmitYoutube();
        }
    }

    const handleSubmitStore = async () => {
        setUploading(true)
        const finalData = await uploadFile()
        console.log(finalData)
        const res = await axios.post("/api/beats/create-beat", finalData)
        setUploading(false)
    }

    const formatUrl = (url) => {
        const url2 = url.split('%2F')[1]
        const urlFinal = url2.split("?")[0]
        let finalUrl
        if (url.includes("cover-imgs")) {
            finalUrl = `cover-imgs/${urlFinal}`
        }
        if (url.includes("mp3-files")) {
            finalUrl = `mp3-files/${urlFinal}`
        }
        if (url.includes("wav-files")) {
            finalUrl = `mp3-files/${urlFinal}`
        }
        if (!finalUrl) {
            console.log("Error empty url")
        }

        return(finalUrl)
    }

    const handleSubmitYoutube = async (e) => {
        setUploading(true)
        const finalData = await uploadFile()
        console.log(finalData)
        const res = await axios.post("/api/beats/create-beat", finalData)
        const imgUrl = formatUrl(finalData.img)
        const audioUrl = formatUrl(finalData.mp3 || finalData.wav)
        const title = finalData.title
        console.log({audio:audioUrl, img:imgUrl, title:title, refreshToken:data.refreshToken})
        const res2 = await axios.post('/api/video/youtube', {audio:audioUrl, img:imgUrl, title:title, refreshToken:data.refreshToken})
        console.log(res2)
        setUploading(false)
    }
    
   
    return (
        <main className="bg-gradient-to-b from-black to-indigo-800 ">
            <UserNavbar/>
            <div className="min-h-screen flex items-center justify-center">
                {uploading && <Loading text="Uploading..."/>}
            {!uploading && <form onSubmit={handleSubmit} className="flex flex-col gap-7 bg-zinc-800 p-10 rounded-lg shadow-sm shadow-black">
                <h1 className="text-white">Upload Instrumental</h1>
                <div className="flex flex-col">
                    <label className="text-white">Title</label>
                    <input name="title" onChange={change} className="border border-solid border-black rounded"/>
                </div>
                <div className="flex flex-col">
                    <label name="price" className="text-white">Price</label>
                    <input name="price" onChange={change} className="border border-solid border-black rounded"/>
                </div>
                <div className="flex flex-col">
                    <label className="text-white">BPM</label>
                    <input name="bpm" onChange={change} className="border border-solid border-black rounded"/>
                </div>
                <div className="flex flex-col">
                <label className="text-white">Upload MP3</label>
                    <input type="file" accept="audio/mp3" onChange={(e) => {console.log(e);setMp3(e.target.files[0])}}></input>
                </div>
                <div className="flex flex-col">
                <label className="text-white">Upload Wav</label>
                    <input type="file" accept="audio/wav" onChange={(e) => {console.log(e);setWav(e.target.files[0])}}></input>
                </div>
                <div className="flex flex-col">
                <label className="text-white">Select Cover Image</label>
                    <input type="file" accept="image/png, image/jpeg" onChange={(e) => {console.log(e);setCoverImg(e.target.files[0])}}></input>
                </div>
                
                
                <button  value="store" className="bg-white text-black text-sm p-2 rounded-sm shawdow">Upload To Store</button>
                <button  value="youtube" className="bg-white text-black text-sm p-2 rounded-sm shawdow">Upload To Store & YouTube</button>

            </form>}
            </div>
            <Footer/>
        </main>
    )
}
export default UploadBeat