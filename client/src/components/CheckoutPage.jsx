import React, {useEffect,useState} from "react"
import axios from "axios"
import {
    useStripe,
    useElements,
    PaymentElement,
} from "@stripe/react-stripe-js"
import convertToSubcurrency from "../../utils/convertToSubcurrency"

const CheckoutPage = (props) => {
    const {beat} = props
    const stripe = useStripe()
    const elements = useElements()
    const [errorMessage, setErrorMessage] = useState("")
    const [clientSecret, setClientSecret] = useState("")
    const [intentId, setIntentId] = useState("")
    const [loading,setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        if (!stripe || !elements) {
            return
        }
        const { submitError } = await elements.submit()
        if(submitError) {
            setErrorMessage(submitError.message)
            setLoading(false)
            return
        }
     
            const result = await stripe.confirmPayment({
                elements,
                clientSecret,
                confirmParams: {
                    return_url: `http://localhost:5173/payment-success?amount=${beat.price}`,
                    payment_method: "pm_card_visa",
                },
            })

            if (result.error) {
                console.log(result.error)
                setErrorMessage(result.error.message)
                setLoading(false)
            return;
            }
            setLoading(false)
        }

    

    useEffect(() => async () =>{
        await axios.post("/api/payments/intent",{amount:convertToSubcurrency(parseFloat(beat.price))})
        .then((res) => setClientSecret(res.data.clientSecret))
    },[beat])
    if (!clientSecret || !stripe || !elements) {
        return (
            <div>
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce: animate-[spin_1.5s_linear_infinitel dark:text-white"
                role="status">
                <span className="!absolute !-m-px !h-px !w-px loverflow-hidden !whitespace-nowrap !border-0 Ip-0 ! [clip:rect(0,0,0,0)]"> Loading...</span>
                </div>
            </div>
        )
    }

    return (
        <main className="min-h-screen bg-gradient-to-b from-indigo-700 to-black text-white font-semibold">
            <h1 className="text-3xl justify-self-center pt-6">Checkout</h1>
            <div className="flex flex-row justify-center gap-1">
            <div className="bg-zinc-900 rounded-xl w-100 p-3 flex flex-row m-10 justify-between gap-4">
                <div className="bg-zinc-800 rounded-xl p-5 grid grid-cols-3 items-center w-8/12 self-start">
                    <img src={beat.img} className="rounded-lg w-1/4 object-cover"/>
                    <h1 className="justify-self-center text-white">{beat.title}</h1>
                    <h1 className="justify-self-end text-white">${beat.price}</h1>
                </div>
                <form onSubmit={handleSubmit} className="bg-white rounded-xl p-2 flex flex-col items-center w-4/12">
                    {clientSecret && <PaymentElement className="p-2 bg-white"/>}
                    <button disabled={!stripe || loading} className="bg-indigo-800 text-center p-3 m-2 rounded-md self-justify-center">{!loading? `Pay $${beat.price}`:"Processing..."}</button>
                    {errorMessage && <h1 className="text-white">{errorMessage}</h1>}
                </form>
            </div>
            </div>
        </main>

    )
}

export default CheckoutPage