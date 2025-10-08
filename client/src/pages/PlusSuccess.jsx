import { useEffect, useContext } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";

const PlusSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { backendUrl, setPlusMember, token } = useContext(ShopContext);

  useEffect(() => {
    const verifySubscription = async () => {
      const session_id = searchParams.get("session_id");
      if (!session_id) return;

      try {
        const res = await axios.get(`${backendUrl}/api/plus/verify?session_id=${session_id}`, {
          headers: { token },
        });

        if (res.data.success) {
          setPlusMember(true); // ✅ Update context immediately
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message || "Verification failed");
        }
      } catch (err) {
        console.error("Plus verification error:", err);
        toast.error(err.response?.data?.message || "Something went wrong");
      } finally {
        navigate("/"); // redirect to home or wherever
      }
    };

    verifySubscription();
  }, [searchParams, backendUrl, token, setPlusMember, navigate]);

  return (
    <div className="text-center py-24">
      <p>Verifying your Plus subscription...</p>
    </div>
  );
};

export default PlusSuccess;
