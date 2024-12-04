import Stripe from "stripe";
import { createError } from "../utils/error.js";
const stripe = new Stripe(process.env.STRIPE_SECRET_TEST_KEY);
export const createIntent = async (req,res,next) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: req.body.amount,
            currency: "usd",
            automatic_payment_methods: {enabled:true}
        })
        res.status(200).send({clientSecret:paymentIntent.client_secret, id:paymentIntent.id})
    } catch(error){
        throw(error)
        console.error("Internal Error", error)
        next(createError(500, `Internal Error: ${error}`))
    }
}

export const confirmPayment = async (req,res,next) => {
    const elements = req.body.elements
    const clientSecret = req.body.clientSecret
    await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
            return_url: `http:localhost:5173/payment-succesful`
        }
    })
}