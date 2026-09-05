import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Stripe from 'stripe';

dotenv.config();

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.use(cors({ origin: process.env.CLIENT_URL })); // only this frontend url can use our backend
app.use(express.json());

// API to create checkout session
app.post("/create-checkout-session", async (req, res) => {
    try {
        const { product } = req.body; // product = name, image, price

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: product.name,
                            images: [product.image],
                        },
                        unit_amount: product.price * 100,
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `${process.env.CLIENT_URL}/success`,
            cancel_url: `${process.env.CLIENT_URL}/cancel`,
        });

        res.json({ url: session.url });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const port = process.env.CLIENT_URL;
app.listen(port, () => {
    console.log("server is started on", port);
});










//   https://checkout.stripe.com/c/pay/cs_test_a1rxXTYQw0Qr8CbF9gCb7Flqd1WCfjsrAxYQRH13V4uOpk05SNsqiHjLwM#fidnandhYHdWcXxpYCc%2FJ2FgY2RwaXEnKSdicGRmZGhqaWBTZHdsZGtxJz8nZmprcXdqaScpJ2R1bE5gfCc%2FJ3VuWnFgdnFaMDRQR19CQEFvRHFzMmhgQEh%2FUTBoYHB8TVFhUnNOZ3E1Ykh9f0xdMUhqdmw9MjdvR2hDfWNVdWR9N1FONW92RlJMPUdrcGd9Zks1dz02XERgUmhHb0w3UVw1NUM9a2l1TTdwJyknY3dqaFZgd3Ngdyc%2FcXdwYCknZ2RmbmJ3anBrYUZqaWp3Jz8nJmNjY2NjYycpJ2lkfGpwcVF8dWAnPyd2bGtiaWBabHFgaCcpJ2BrZGdpYFVpZGZgbWppYWB3dic%2FcXdwYHgl
