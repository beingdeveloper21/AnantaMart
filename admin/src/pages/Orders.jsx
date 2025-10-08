import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const fetchAllOrders = async () => {
    if (!token) return;
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/list`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) setOrders(response.data.orders);
      else toast.error(response.data.message || "Failed to fetch orders");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/status`,
        { orderId, status: event.target.value },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        await fetchAllOrders();
        toast.success("Status updated successfully");
      } else {
        toast.error(response.data.message || "Failed to update status");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

   useEffect(() => {
    // Initial fetch
    fetchAllOrders();

    // Polling every 3 seconds (3000ms)
    const interval = setInterval(() => {
      fetchAllOrders();
    }, 3000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, [token]);

  return (
    <div className="p-5">
      <h3 className="text-xl font-bold mb-4">Order Page</h3>
      <div className="space-y-4">
        {orders.map((order, index) => (
          <div
            key={index}
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 text-xs sm:text-sm text-gray-700"
          >
            <img className="w-12" src={assets.parcel_icon} alt="Parcel" />
            <div>
              {order.items.map((item, i) => (
                <p key={i} className="py-0.5">
                  {item.name} X {item.quantity} {item.size || ""}
                  {i !== order.items.length - 1 && ","}
                </p>
              ))}
              <p className="mt-3 mb-2 font-medium">
                {order.address.firstName} {order.address.lastName}
              </p>
              <p>{order.address.street},</p>
              <p>
                {order.address.city}, {order.address.state}, {order.address.country},{" "}
                {order.address.zipcode}
              </p>
              <p>{order.address.phone}</p>
            </div>
            <div>
              <p className="text-sm sm:text-[15px]">Items: {order.items.length}</p>
              <p className="mt-3">Method: {order.paymentMethod}</p>
              <p>Payment: {order.payment ? "Done" : "Pending"}</p>
              <p>Date: {new Date(order.date).toLocaleDateString()}</p>
            </div>
            <p className="text-sm sm:text-[15px]">₹{order.amount}</p>
           <select
  onChange={(event) => statusHandler(event, order.orderId)}
  value={order.status}
  className="p-2 font-semibold border border-gray-300 rounded"
>
  <option value="Order Placed">Order Placed</option>
  <option value="Packing">Packing</option>
  <option value="Shipped">Shipped</option>
  <option value="Out for Delivery">Out for Delivery</option>
  <option value="Delivered">Delivered</option>
  <option value="Return in Process">Return in Process</option>
  <option value="Returned and Refunded">Returned and Refunded</option>
</select>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;

