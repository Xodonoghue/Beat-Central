import { useNavigate,useSearchParams } from "react-router-dom"
import UserNavbar from "./UserNavbar"
import { useEffect, useState } from "react"
import axios from "axios"
import Footer from "./Footer"
import useFetch from "../../hooks/useFetch"
import { useContext } from "react"
import { AuthContext } from "../../contexts/authContext"

const Dashboard = () => {
    const navigate = useNavigate()
    const {user, loading, error, dispatch} = useContext(AuthContext)
    const {data,reFetch} = useFetch(`/api/users/get/${user?.uid}`)

    useEffect(() => {
        reFetch(`/api/users/get/${user?.uid}`)
    }, user)
    
    return (
        <main className="bg-gradient-to-b from-black to-indigo-800  min-h-screen flex flex-col">
            <UserNavbar/>
            <div className="p-10 flex flex-col flex-grow items-center justify-center gap-10">
                <h1 className="text-white text-3xl self-center">Welcome {data?.firstName}</h1>
                <div className="flex flex-rows gap-5 justify-center">
                    <div className="border border-white border-2 p-5 rounded-3xl shadow-lg shadow-black">
                        <button onClick={()=>{navigate("/upload-beat")}} className="text-white">Upload Beat</button>
                    </div>
                    <div className="border border-white border-2 p-5 rounded-3xl shadow-lg shadow-black">
                        <button onClick={()=>{navigate("/manage-store")}} className="text-white">Manage Store</button>
                    </div>
                </div>
            </div>
            <Footer/>
        </main>
    )
} 
export default Dashboard