import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Stripe from 'stripe';

dotenv.config();

const app = express();
const stripe = new Stripe(
    process.env.STRIPE_SECRET_KEY
)

app.use(cors({origin:process.env.CLIENT_URL})) //only this frontend url can use our backend file 
app.use(express.json());

//API to create checkout session 

app.post("/create-checkout-session", async(req,res)=>{
    try{
        const {product} = req.body // product = name,image,price
        const session = await stripe.checkout.sessions.create({
            payment_method_type : ["card"],
            line_items : [
                {
                    price_data : {
                        currency : "usd",
                        {
                            product_data : {
                                name  : product.name,
                                images : [product.image],
            
                            },
                            unit_amount : product.price * 100
                        },
                        quantity : 1
                    }
                }
            ],
            mode : "payment",
            success_url : `${process.env.CLIENT_URL}/success`,
            cancel_url : `${process.env.CLIENT_URL}/cancel`
        })

        res.json({url:session.url})
    }
    catch(error){
        res.status(500).json({error : error.message})
    }
})

const port = 5000
app.listen(port,()=>{
    console.log("sever is started on ",port)
})