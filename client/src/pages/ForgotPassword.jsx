import React, { useState, useContext } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const { backendUrl } = useContext(ShopContext);
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // 1: email, 2: OTP, 3: reset password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // Step 1: Send OTP
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

  // Step 2: Verify OTP
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

  // Step 3: Reset Password
  const resetPassword = async () => {
    if (!newPassword) return toast.error("Enter new password");
    try {
      const res = await axios.post(`${backendUrl}/api/user/forgot-password/reset-password`, { email, otp, newPassword });
      if (res.data.success) {
        toast.success("Password reset successfully!");
        navigate("/login"); // redirect to login
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="flex flex-col w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800">
      {step === 1 && (
        <>
          <p className="text-2xl">Forgot Password</p>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 w-full"
          />
          <button onClick={sendOtp} className="bg-black text-white p-2 mt-2">
            Send OTP
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <p className="text-2xl">Enter OTP</p>
          <input
            type="text"
            placeholder="OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="border p-2 w-full"
          />
          <button onClick={verifyOtp} className="bg-black text-white p-2 mt-2">
            Verify OTP
          </button>
        </>
      )}

      {step === 3 && (
        <>
          <p className="text-2xl">Reset Password</p>
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="border p-2 w-full"
          />
          <button onClick={resetPassword} className="bg-black text-white p-2 mt-2">
            Reset Password
          </button>
        </>
      )}
    </div>
  );
};

export default ForgotPassword;
