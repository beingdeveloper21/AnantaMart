// Frontend: NewsletterBox.jsx (Plus subscription button)
import React, { useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";

const NewsletterBox = () => {
  const { plusMember, token, backendUrl } = useContext(ShopContext);

  const onSubscribe = async (e) => {
    e.preventDefault();
    if (!token) return toast.error("Please login first!");

    try {
      const res = await axios.post(
        `${backendUrl}/api/plus/subscribe`,
        { amount: 199 },
        { headers: { token } }
      );

      if (res.data.success && res.data.session_url) {
        window.location.href = res.data.session_url;
      } else {
        toast.error(res.data.message || "Failed to start subscription");
      }
    } catch (err) {
      console.error("Plus subscription error:", err);
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  if (plusMember) {
    return (
      <div className="text-center px-4 py-12">
        <div className="inline-flex items-center gap-2 bg-yellow-400 text-black font-semibold px-4 py-2 rounded-full shadow-md">
          Plus Member
        </div>
        <p className="mt-3 text-gray-600">Thank you for being a Plus subscriber!</p>
      </div>
    );
  }

  return (
    <div className="text-center px-4 py-12">
      <p className="text-2xl font-medium text-gray-800">Subscribe now!</p>
      <form onSubmit={onSubscribe} className="w-full sm:w-2/3 md:w-1/2 flex items-center gap-3 mx-auto mt-8 border rounded-lg p-2">
        <button
          type="submit"
          className="bg-black text-white text-xs px-6 py-3 rounded-md hover:bg-gray-800 transition"
        >
          SUBSCRIBE ₹199
        </button>
      </form>
    </div>
  );
};

export default NewsletterBox;
