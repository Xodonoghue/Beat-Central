import { useNavigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { AuthContext } from "../../contexts/authContext"
import Loading from "./Loading"
import Navbar from "./Navbar"
import Footer from "./Footer"

const Login = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({})
    const {user, loading, error, dispatch} = useContext(AuthContext)
    const [loggingIn, setLoggingIn] = useState(false)

    const change = (e) => {
        const {name,value} = e.target
        setFormData({...formData, [name]:value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoggingIn(true)
        dispatch({type:"LOGIN_START"})
        try {
            const res = await axios.post("/api/auth/login", formData)
            setLoggingIn(false)
            if (res.status === 200){
                dispatch({type:"LOGIN_SUCCESS", payload:res.data})
            } else {
                dispatch({ type: "LOGIN_FAILURE", payload: err.response?.data || "Login failed" });
            }
        } catch(err) {
            console.log(err)
            setLoggingIn(false)
            dispatch({ type: "LOGIN_FAILURE", payload: err.response?.data || "Login failed" });
        }
        
    }

    useEffect(() => {
        if (user) {
            navigate("/dashboard")
        }
    },[user, error])

return (
    <main className="pt-36 min-h-screen bg-gradient-to-b from-black to-indigo-800 flex flex-col">
    <Navbar/>
    <div className="flex items-center justify-center p-20 flex-grow">
    {loggingIn && <Loading text="Logging In.."/>}
        {!loggingIn && <form onSubmit={handleSubmit} className="gap-5 flex flex-col w-80 justify-self-center items-center bg-stone-950 border border-neutral-400 p-10 rounded-xl shadow-sm shadow-neutral-200">
            <h1 className="text-white text-2xl text-center">Login</h1>
                <input name="email" onChange={change} placeholder="email" className="border border-black rounded "></input>
                <div>
                    <input name="password" onChange={change} placeholder="password" className="border border-black rounded"></input>
                    {error && <p className="text-red-500 text-sm py-1">Incorrect email or password</p>}
                </div>
            <button className="bg-white text-black text-sm p-2 rounded-sm shawdow">Continue</button>
            <div className="flex gap-2">
            <p className="text-white text-sm">Don't Have An Account?</p>
            <button className="text-white text-sm underline" onClick={() => {navigate("/signup")}}>Sign Up</button>
            </div>
        </form>} 
    </div>
    <Footer/>       
    </main>
)
}
export default Login