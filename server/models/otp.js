import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: Number, required: true },
  expiresAt: { type: Date, required: true, default: () => Date.now() + 10 * 60 * 1000 }, // 10 min
});

export default mongoose.model("OTP", otpSchema);
