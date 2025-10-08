import express from "express";
import { sendOtp, verifyOtp, resetPassword } from "../controllers/forgotPasswordController.js";

const router = express.Router();

router.post("/", sendOtp);        // Instead of /send-otp
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);

export default router;
