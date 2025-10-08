import React, { useContext, useState, useEffect, useMemo } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import { toast } from "react-toastify";
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const PlaceOrder = () => {
  const location = useLocation();
  const { navigate, backendUrl, cartItems, setCartItems, delivery_fee, plusMember } = useContext(ShopContext);

  const [method, setMethod] = useState('cod');
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '',
    street: '', city: '', state: '', zipcode: '',
    country: '', phone: ''
  });

  const [orderItems, setOrderItems] = useState([]);

  // Load order items: Buy Now vs Cart
  useEffect(() => {
    if (location.state?.items) {
      setOrderItems(location.state.items);
    } else {
      const items = Object.entries(cartItems).map(([id, item]) => ({
        _id: id,
        quantity: item?.quantity || 0,
        price: item?.price || 0,
        name: item?.name || '',
        image: item?.image || ''
      }));
      setOrderItems(items);
    }
  }, [location.state, cartItems]);

  // Total amount calculation
  const totalAmount = useMemo(() => {
    let subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let discountedSubtotal = subtotal;
    if (plusMember && subtotal > 999) {
      discountedSubtotal = parseFloat((subtotal * 0.96).toFixed(2));
    }
    return discountedSubtotal + delivery_fee;
  }, [orderItems, plusMember, delivery_fee]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (orderItems.length === 0) return toast.error("No items to order.");

    try {
      const payload = {
        items: orderItems.map(item => ({ _id: item._id, name: item.name, quantity: item.quantity, amount: item.price })),
        amount: totalAmount,
        address: formData
      };

      const headers = {
        token: localStorage.getItem("token"),
        userid: localStorage.getItem("userId")
      };

      if (method === 'stripe') {
        const res = await axios.post(`${backendUrl}/api/order/stripe`, payload, { headers });
        if (res.data.success) window.location.replace(res.data.session_url);
      } else {
        const res = await axios.post(`${backendUrl}/api/order/place`, payload, { headers });
        if (res.data.success) {
          const remainingCart = { ...cartItems };
          orderItems.forEach(item => delete remainingCart[item._id]);
          setCartItems(remainingCart);
          toast.success("Order placed successfully");
          navigate("/orders");
        }
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || "Order failed");
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* Delivery Form */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1="DELIVERY" text2=" INFORMATION" />
        </div>
        <div className='flex gap-3'>
          <input onChange={onChangeHandler} name='firstName' value={formData.firstName} placeholder='First Name' className='border rounded py-1.5 px-3.5 w-full' required />
          <input onChange={onChangeHandler} name='lastName' value={formData.lastName} placeholder='Last Name' className='border rounded py-1.5 px-3.5 w-full' required />
        </div>
        <input onChange={onChangeHandler} name='email' value={formData.email} placeholder='Email' type="email" className='border rounded py-1.5 px-3.5 w-full' required />
        <input onChange={onChangeHandler} name='street' value={formData.street} placeholder='Street' className='border rounded py-1.5 px-3.5 w-full' required />
        <div className='flex gap-3'>
          <input onChange={onChangeHandler} name='city' value={formData.city} placeholder='City' className='border rounded py-1.5 px-3.5 w-full' required />
          <input onChange={onChangeHandler} name='state' value={formData.state} placeholder='State' className='border rounded py-1.5 px-3.5 w-full' required />
        </div>
        <div className='flex gap-3'>
          <input onChange={onChangeHandler} name='zipcode' value={formData.zipcode} placeholder='Zip' className='border rounded py-1.5 px-3.5 w-full' required />
          <input onChange={onChangeHandler} name='country' value={formData.country} placeholder='Country' className='border rounded py-1.5 px-3.5 w-full' required />
        </div>
        <input onChange={onChangeHandler} name='phone' value={formData.phone} placeholder='Phone' className='border rounded py-1.5 px-3.5 w-full' required />
      </div>

      {/* Cart Total & Payment */}
      <div className='mt-8 w-full sm:max-w-[400px]'>
        <CartTotal items={orderItems} plusMember={plusMember} delivery_fee={delivery_fee} />
        <div className='mt-12'>
          <Title text1="PAYMENT" text2=" METHOD" />
          <div className='flex gap-3 flex-col lg:flex-row mt-2'>
            <div className={`flex items-center gap-3 border p-2 cursor-pointer ${method==='stripe'?'border-green-400':''}`} onClick={()=>setMethod('stripe')}>
              <p className={`min-w-3.5 h-3.5 rounded-full border ${method==='stripe'?'bg-green-400':''}`}></p>
              <img className='h-5 mx-4' src={assets.stripe_logo} alt="Stripe"/>
            </div>
            <div className={`flex items-center gap-3 border p-2 cursor-pointer ${method==='cod'?'border-green-400':''}`} onClick={()=>setMethod('cod')}>
              <p className={`min-w-3.5 h-3.5 rounded-full border ${method==='cod'?'bg-green-400':''}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
            </div>
          </div>
          <div className='w-full text-end mt-8'>
            <button type="submit" className='bg-black text-white py-3 px-16 text-sm'>PLACE ORDER</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
