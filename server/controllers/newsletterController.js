import userModel from "../models/userModel.js";
import { sendEmail } from "../config/email.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2024-06-20" });

export const subscribeNewsletter = async (req, res) => {
  try {
    const userId = req.userId; // we will use token to get user
    const { amount } = req.body; // amount = 199

    if (!userId) return res.status(401).json({ success: false, message: "Unauthorized" });

    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    if (user.plusMember) return res.json({ success: true, message: "Already a Plus Member!" });

    const origin = req.headers.origin;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: { name: 'AnantaMart Plus Subscription' },
            unit_amount: Math.round(amount * 100),
          },
          quantity: 1,
        }
      ],
      mode: 'payment',
      success_url: `${origin}/plus/verify?success=true`,
      cancel_url: `${origin}/plus/verify?success=false`,
      customer_email: user.email
    });

    res.json({ success: true, session_url: session.url });

  } catch (error) {
    console.error("subscribeNewsletter error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
