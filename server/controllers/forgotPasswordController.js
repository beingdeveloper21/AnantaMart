import UserModel from "../models/userModel.js";
import OTPModel from "../models/otp.js";
import { sendEmail } from "../config/email.js";
import bcrypt from "bcrypt";

// Send OTP to email
export const sendOtp = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const otp = Math.floor(100000 + Math.random() * 900000);
    await OTPModel.create({ email, otp });

    await sendEmail({ to: email, subject: "Your OTP Code", html: `Your OTP is: <b>${otp}</b>` });
    res.json({ success: true, message: "OTP sent to your email" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Verify OTP
export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const otpEntry = await OTPModel.findOne({ email, otp });
    if (!otpEntry || otpEntry.expiresAt < Date.now()) {
      return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
    }
    res.json({ success: true, message: "OTP verified" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Reset password
export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  try {
    const otpEntry = await OTPModel.findOne({ email, otp });
    if (!otpEntry || otpEntry.expiresAt < Date.now()) {
      return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
    }

    const user = await UserModel.findOne({ email });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    // Remove used OTP
    await OTPModel.deleteMany({ email });
    res.json({ success: true, message: "Password reset successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
