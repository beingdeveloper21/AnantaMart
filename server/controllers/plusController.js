// controllers/plusController.js
import dotenv from "dotenv";
dotenv.config();

import Stripe from "stripe";
import userModel from "../models/userModel.js";
import { sendEmail } from "../config/email.js";

// Initialize Stripe with secret key from .env
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2024-06-20" });

// ------------------- Subscribe to Plus -------------------
export const subscribePlus = async (req, res) => {
  try {
    const userId = req.userId; // from auth middleware
    const { amount } = req.body; // e.g., 199
    const origin = req.headers.origin;

    if (!userId) return res.status(401).json({ success: false, message: "Unauthorized" });

    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    if (user.plusMember)
      return res.json({ success: true, message: "Already a Plus Member!" });

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: { name: "AnantaMart Plus Subscription" },
            unit_amount: Math.round(amount * 100), // Convert ₹ to paise
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/plus-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/plus-cancel`,
      metadata: { userId: user._id.toString() },
      customer_email: user.email,
    });

    res.json({ success: true, session_url: session.url });
  } catch (err) {
    console.error("subscribePlus error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ------------------- Verify Plus Subscription -------------------
export const verifyPlusSubscription = async (req, res) => {
  try {
    const { session_id } = req.query;

    if (!session_id)
      return res.status(400).json({ success: false, message: "Session ID required" });

    // Retrieve Stripe session
    const session = await stripe.checkout.sessions.retrieve(session_id);
    if (!session || session.payment_status !== "paid")
      return res.status(400).json({ success: false, message: "Payment not completed" });

    const userId = session.metadata.userId;
    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    if (user.plusMember)
      return res.json({ success: true, message: "Already a Plus Member!" });

    // Mark user as Plus Member
    user.plusMember = true;
    await user.save();

    // Send welcome email
    if (user.email) {
      const emailHtml = `
        <h1>Congratulations!</h1>
        <p>Hi ${user.name || "Customer"},</p>
        <p>You are now an <strong>AnantaMart Plus Member</strong>.</p>
        <p>Enjoy exclusive discounts and benefits!</p>
      `;
      await sendEmail({
        to: user.email,
        subject: "Welcome to AnantaMart Plus!",
        html: emailHtml,
      });
    }

    res.json({ success: true, message: "Plus subscription activated!" });
  } catch (error) {
    console.error("verifyPlusSubscription error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
