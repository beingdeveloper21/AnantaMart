import React, { useEffect, useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Verify = () => {
  const { backendUrl, setCartItems } = useContext(ShopContext);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [verified, setVerified] = useState(false); // ✅ prevent multiple POSTs

  const success = searchParams.get('success') === 'true';
  const orderId = searchParams.get('orderId');
  const token = localStorage.getItem('token');

  const verifyPayment = async () => {
    if (!token || !orderId) {
      toast.error('Authentication or order details are missing.');
      navigate('/login');
      return;
    }

    try {
      console.log('Verifying Stripe payment:', { success, orderId });

      const response = await axios.post(
        `${backendUrl}/api/order/verifyStripe`,
        { success, orderId },
        { headers: { token } } // token required by backend middleware
      );

      console.log('Verify Payment Response:', response.data);

      if (response.data.success) {
        toast.success(response.data.message || 'Payment verified successfully.');
        setCartItems({}); // clear cart on success
        navigate('/orders'); // redirect to orders page
      } else {
        toast.error(response.data.message || 'Payment verification failed.');
        if (response.data.cartData) setCartItems(response.data.cartData); // restore cart if returned
        navigate('/cart'); // redirect to cart on failure
      }
    } catch (error) {
      console.error('Error verifying payment:', error);
      toast.error('Payment verification failed. Please try again.');
      navigate('/cart');
    }
  };

  useEffect(() => {
    if (orderId && token && !verified) {
      verifyPayment();
      setVerified(true); // ✅ only call once
    }
  }, [orderId, token, verified]);

  return (
    <div className="text-center mt-10">
      Processing Payment Verification...
    </div>
  );
};

export default Verify;
