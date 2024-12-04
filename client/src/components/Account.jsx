import { useContext, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import Footer from "./Footer";
import UserNavbar from "./UserNavbar";
import { AuthContext } from "../../contexts/authContext";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import axios from 'axios'

export default function Account() {
    const [searchParams] = useSearchParams();
    const code = searchParams?.get("code")
    const [accessToken, setAccessToken] = useState(null)
    const [refreshToken, setRefreshToken] = useState(null)
    const authContext = useContext(AuthContext)
    const user = authContext.user
    const authError = authContext.error
    const authLoading = authContext.loading
    const dispatch = authContext.dispatch
    const {data,loading,error,reFetch} = useFetch(`/api/users/get/${user?.uid}`)
    console.log(error)

    const clientId = import.meta.env.VITE_CLIENT_ID;
    const redirectUri = 'http://localhost:5173/account'; // Your app's callback URL
    const scope = 'https://www.googleapis.com/auth/youtube'
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${encodeURIComponent(scope)}&access_type=offline&prompt=consent`;

    console.log(data)
    useEffect(() => {
       if (user) {
            reFetch(`http://localhost:7001/api/auth/get/${user.uid}`)
       }
    },[user])
    
    useEffect(() => async() => {
        if (code) {
             const res = await axios.get(`/api/auth/token?code=${code}`)
             if(res.data.refresh_token) {
                console.log(`token ${res.data}`)
                const newRes = await axios.post('/api/users/update', {id: user?.uid,
                refreshToken:res.data.refresh_token})
                reFetch()
             }

        }
     },[code])
    
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post()

    }

    const disconnect = async () => {
        await axios.post('/api/users/update', {id: user?.uid,refreshToken:""})
        reFetch()
    }

    return (
        <main className="grid grid-cols-1 min-h-screen bg-gradient-to-b from-black to-indigo-800 content-between">
            <UserNavbar/>
            <div className="bg-zinc-900 p-5 rounded-xl flex flex-row gap-5 w-10/12 mx-auto">
                <div className="flex flex-col bg-zinc-800 text-white rounded-xl p-5 w-4/12 gap-3">
                    <h1 className="font-bold text-lg">Account Information</h1>
                    <h1>Username: {data.username}</h1>
                    <h1>Email: {data.email}</h1>
                    <h1>First Name: {data.firstName}</h1>
                    <h1>Last Name: {data.lastName}</h1>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col bg-zinc-800 text-white rounded-xl p-5 w-4/12 self-start gap-2">
                    <h1 className="font-bold text-lg">Change Password</h1>
                    <div>
                        <h1>Old Password:</h1>
                        <input className="rounded-md"/>
                    </div>
                    <div>
                        <h1>New Password:</h1>
                        <input className="rounded-md"/>
                    </div>
                    <div>
                        <h1>Confirm New Password:</h1>
                        <input className="rounded-md"/>
                    </div>
                    <div className="pt-3">
                        <button type="submit" className="bg-white text-black rounded p-2">Submit Change</button>
                    </div>
                    
                </form>
                 <div className="bg-zinc-800 rounded-xl p-5 items-center w-4/12 self-start">
                 {(data.refreshToken || accessToken) ?
                 <div className="flex flex-col gap-3"> 
                 <h1 className="text-green-400 self-center">YouTube Status: Connected</h1>
                 <button className="bg-white rounded-md p-2 self-center w-7/12" onClick={() => {disconnect()}}>Disconnect YouTube</button>
                 </div>:
                 <div className="flex flex-col gap-3"> 
                 <h1 className="text-red-400 self-center">YouTube Status: Not Connected</h1>
                 <button className="bg-white rounded-md p-2 self-center w-7/12" onClick={() => {window.location.href = authUrl;}}>Connect YouTube</button>
                 </div>
                 }
                </div>:
            </div>
            <Footer/>
        </main>
    )
}