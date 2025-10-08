import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";
import { toast } from "react-toastify";

const Orders = () => {
  const { backendUrl, currency } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);

  // Fetch orders
  const loadOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await axios.get(`${backendUrl}/api/order/userorders`, {
        headers: { token },
      });

      if (response.data.success) {
        const formattedOrders = response.data.orders.map((order) => ({
          ...order,
          _id: order._id || order.orderId,
        }));
        setOrders(formattedOrders.reverse());
      } else {
        toast.error(response.data.message || "Failed to fetch orders");
      }
    } catch (error) {
      console.error("Error loading orders:", error);
      toast.error("Something went wrong while loading orders");
    }
  };
   
  // Cancel order
  const cancelOrder = async (orderId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${backendUrl}/api/order/cancel`,
        { orderId },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success("Order cancelled successfully!");
        setOrders((prev) => prev.filter((order) => order._id !== orderId));
      } else {
        toast.error(response.data.message || "Failed to cancel order");
      }
    } catch (error) {
      console.error("Cancel order error:", error);
      toast.error("Something went wrong while cancelling order");
    }
  };

  // Return order
  const returnOrder = async (orderId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${backendUrl}/api/order/return`,
        { orderId },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success("Return request placed! Admin will approve soon.");
        await loadOrders();
      } else {
        toast.error(response.data.message || "Failed to place return request");
      }
    } catch (error) {
      console.error("Return order error:", error);
      toast.error("Something went wrong while returning order");
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);
   useEffect(() => {
    loadOrders(); // ✅ initial fetch on mount

    // ✅ poll every 5 seconds to get updated order statuses automatically
    const interval = setInterval(() => {
      loadOrders();
    }, 5000); // adjust interval as needed

    return () => clearInterval(interval); // cleanup on unmount
  }, []);
  
  // Check if return button can show
  const canReturn = (order) => {
    if (order.status !== "Delivered") return false;
    const deliveredDate = order.deliveredAt
      ? new Date(order.deliveredAt)
      : new Date(order.date);
    const today = new Date();
    const diffDays = Math.floor((today - deliveredDate) / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
  };

  return (
    <div className="border-t pt-16 px-4 md:px-16">
      <Title text1="MY" text2="ORDERS" />

      {orders.length === 0 ? (
        <p className="text-gray-500 text-center py-10">No orders found.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="py-4 border-t border-b text-gray-700 flex flex-col gap-4"
          >
            <h3 className="font-semibold text-lg">Order #{order._id}</h3>

            {order.items.map((item, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row gap-4 items-center"
              >
                <img
                  className="w-16 sm:w-20"
                  src={item.image?.[0] || "/placeholder-image.jpg"}
                  alt={item.name || "Product Image"}
                />
                <div>
                  <p className="font-medium text-sm sm:text-base">
                    {item.name || "Unknown Product"}
                  </p>
                  <div className="text-gray-700 text-sm mt-1">
                    <p>
                      Price: {currency}
                      {item.amount || "N/A"}
                    </p>
                    <p>Quantity: {item.quantity || 0}</p>
                  </div>
                </div>
              </div>
            ))}

            <div className="mt-2 text-sm text-gray-600">
              <p>
                <span className="font-semibold">Total Amount:</span>{" "}
                {currency}
                {order.amount}
              </p>
              <p>
                <span className="font-semibold">Payment Method:</span>{" "}
                {order.paymentMethod || "Unknown"}
              </p>
              <p>
                <span className="font-semibold">Status:</span> {order.status}
              </p>
              <p>
                <span className="font-semibold">Date:</span>{" "}
                {order.date
                  ? new Date(order.date).toLocaleDateString()
                  : "Unknown"}
              </p>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              {/* Cancel button */}
              {["Pending","Order Placed", "Packing", "Shipped","Out for Delivery","Confirmed"].includes(order.status) && (
                <button
                  onClick={() => cancelOrder(order._id)}
                  className="border px-4 py-2 text-sm font-medium rounded-sm bg-red-500 text-white hover:bg-red-600"
                >
                  Cancel Order
                </button>
              )}

              {/* Return button */}
              {canReturn(order) && order.status === "Delivered" && (
                <button
                  onClick={() => returnOrder(order._id)}
                  className="border px-4 py-2 text-sm font-medium rounded-sm bg-yellow-500 text-white hover:bg-yellow-600"
                >
                  Return Order
                </button>
              )}

              {/* Return in Process */}
              {order.status === "Return in Process" && (
                <button
                  disabled
                  className="border px-4 py-2 text-sm font-medium rounded-sm bg-gray-400 text-white cursor-not-allowed"
                >
                  Return Requested
                </button>
              )}

              {/* Returned and Refunded → no buttons */}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
