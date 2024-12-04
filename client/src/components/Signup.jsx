import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Signup = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({});
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        console.log(formData)
    };
    const handleSubmit = (e) => {
        e.preventDefault()
        setFormData({
            ...formData,
            beats: []
        });
        axios.post("http://localhost:7001/api/auth/register",formData)
        navigate("/Dashboard")
    }

    return (
        <main className="pt-36 min-h-screen bg-gradient-to-b from-black to-indigo-800">
        <Navbar/>
        <div className="flex items-center justify-center p-20">
        <form onSubmit={handleSubmit} className="gap-5 flex flex-col w-80 justify-self-center items-center bg-stone-950 border border-neutral-400 p-10 rounded-xl shadow-sm shadow-neutral-200">
            <h1 className="text-white text-2xl text-center">Sign Up</h1>
                <input onChange={handleChange} name="firstName" placeholder="first name" className="border border-black rounded "></input>
                <input onChange={handleChange} name="lastName" placeholder="last name" className="border border-black rounded "></input>
                <input onChange={handleChange} name="email" placeholder="email" className="border border-black rounded "></input>
                <input onChange={handleChange} name="username" placeholder="choose username" className="border border-black rounded "></input>
                <input onChange={handleChange} name="password" placeholder="choose password" className="border border-black rounded"></input>
            <button className="bg-white text-black text-sm p-2 rounded-sm shawdow" type="submit">Continue</button>
            <div className="flex gap-2">
                <p className="text-white text-sm">Already Have An Account?</p>
                <button className="text-white text-sm underline" onClick={() => {navigate("/login")}} type="submit">Log In</button>
            </div>
            <GoogleLoginComponent/>
        </form>
        </div>
        
        <Footer/>       
        </main>
    )
}
export default Signup