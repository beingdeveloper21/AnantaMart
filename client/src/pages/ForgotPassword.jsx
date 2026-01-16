import React, { useState, useContext } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Mail, KeyRound, Lock } from "lucide-react";

const ForgotPassword = () => {
  const { backendUrl } = useContext(ShopContext);
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const sendOtp = async () => {
    if (!email) return toast.error("Please enter your email");
    try {
      const res = await axios.post(`${backendUrl}/api/user/forgot-password/`, { email });
      if (res.data.success) {
        toast.success("OTP sent to your email!");
        setStep(2);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  const verifyOtp = async () => {
    if (!otp) return toast.error("Enter the OTP");
    try {
      const res = await axios.post(`${backendUrl}/api/user/forgot-password/verify-otp`, { email, otp });
      if (res.data.success) {
        toast.success("OTP verified!");
        setStep(3);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  const resetPassword = async () => {
    if (!newPassword) return toast.error("Enter new password");
    try {
      const res = await axios.post(`${backendUrl}/api/user/forgot-password/reset-password`, { email, otp, newPassword });
      if (res.data.success) {
        toast.success("Password reset successfully!");
        navigate("/login");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-100 to-blue-200 flex justify-center items-center px-4">
      <div className="bg-white/40 backdrop-blur-2xl border border-white/60 shadow-2xl rounded-3xl w-full max-w-md p-8 transform hover:-translate-y-1 transition duration-300">

        <h1 className="text-3xl font-bold text-center text-blue-900 mb-2">
          Reset Password
        </h1>
        <p className="text-center text-gray-700 mb-6 text-sm">
          Securely update your account credentials
        </p>

        <h2 className="text-xl font-semibold text-center text-blue-900 mb-4">
          {step === 1
            ? "Enter your registered email"
            : step === 2
            ? "Enter OTP sent to your mail"
            : "Create a new password"}
        </h2>

        <div className="space-y-5">
          {step === 1 && (
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-blue-600" size={20} />
              <input
                type="email"
                className="input-field"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                onClick={sendOtp}
                className="w-full mt-4 bg-blue-700 text-white py-3 rounded-xl font-semibold hover:bg-blue-800 active:scale-95 transition shadow-md"
              >
                Send OTP
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="relative">
              <KeyRound className="absolute left-3 top-3 text-blue-600" size={20} />
              <input
                type="text"
                className="input-field"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <button
                onClick={verifyOtp}
                className="w-full mt-4 bg-blue-700 text-white py-3 rounded-xl font-semibold hover:bg-blue-800 active:scale-95 transition shadow-md"
              >
                Verify OTP
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-blue-600" size={20} />
              <input
                type="password"
                className="input-field"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button
                onClick={resetPassword}
                className="w-full mt-4 bg-blue-700 text-white py-3 rounded-xl font-semibold hover:bg-blue-800 active:scale-95 transition shadow-md"
              >
                Reset Password
              </button>
            </div>
          )}

          <p className="text-center text-sm text-blue-700 font-medium mt-4 cursor-pointer hover:underline" onClick={() => navigate("/login")}>
            Back to Login
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
