//import CheckoutPage from "@/components/CheckoutPage"
import convertToSubcurrency from "../../utils/convertToSubcurrency"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import CheckoutPage from "./CheckoutPage"
import { useSearchParams } from "react-router-dom"
import { useEffect, useState } from "react"
import Loading from "./Loading"
import axios from "axios"

if (import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY === undefined) {
    throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined")
}
const stripePromise = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)
export default function Checkout() {
    const [searchParams] = useSearchParams();
    const beatId = searchParams.get("id");
    const [data, setData] = useState()

    useEffect(() => async() =>{
        const res = await axios.get(`http://localhost:7001/api/beats/single/${beatId}`)
        if (res) {
            setData(res.data)
        }
    },[])

    if (!data){
        return (
            <Loading text="Loading..."/>
        )
    }
    
    return (
        <Elements
        stripe={stripePromise}
        options={{
            mode: "payment",
            amount: convertToSubcurrency(data.price),
            currency: "usd"
        }} 
        >
        <CheckoutPage beat={data}/> 
        </Elements>
    )
}