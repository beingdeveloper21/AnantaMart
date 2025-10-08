
import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const delivery_fee = 50;
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [plusMember, setPlusMember] = useState(undefined);
  const [orders, setOrders] = useState([]); // ✅ track user orders automatically
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const categories = [
    { label: "Transportation", value: "transportation" },
    { label: "Building Materials", value: "building-materials" },
    { label: "Electrical Supplies", value: "electrical-supplies" },
    { label: "Safety Equipment", value: "safety-equipment" },
    { label: "Office Furniture", value: "office-furniture" },
    { label: "Industrial Equipment", value: "industrial-equipment" },
    { label: "Office Supplies", value: "office-supplies" },
    { label: "Electronics", value: "electronics" },
  ];

  // ------------------ PRODUCTS ------------------
  const getProductsData = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/product/list`);
      if (res.data.success) setProducts(res.data.products);
      else toast.error(res.data.message);
    } catch (err) {
      toast.error(err.message);
      console.error(err);
    }
  };

  // ------------------ CART ------------------
  const fetchCartData = async (userId, token) => {
    if (!userId || !token) return;
    try {
      const res = await axios.get(`${backendUrl}/api/cart/get`, {
        headers: { userid: userId, token },
      });
      if (res.data.success) setCartItems(res.data.cartData);
      else toast.error(res.data.message || "Failed to fetch cart");
    } catch (err) {
      console.error("Fetch cart error:", err);
      toast.error(err.message);
    }
  };

  // ------------------ ORDERS ------------------
  const fetchOrders = async () => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    if (!userId || !token) return;
    try {
      const res = await axios.get(`${backendUrl}/api/order/userorders`, {
        headers: { token },
      });
      if (res.data.orders) setOrders(res.data.orders);
    } catch (err) {
      console.error("Fetch orders error:", err);
    }
  };

  // ------------------ PLUS MEMBER ------------------
  const fetchPlusStatus = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if (!token || !userId) return;
    try {
      const res = await axios.get(`${backendUrl}/api/user/status`, {
        headers: { token, userid: userId },
      });
      if (res.data.success) setPlusMember(res.data.plusMember);
    } catch (err) {
      console.error("Failed to fetch Plus Member status:", err);
    }
  };

  // ------------------ CART ACTIONS ------------------
  const addToCart = async (itemId) => {
    const userId = localStorage.getItem("userId");
    if (!token || !userId) {
      navigate("/cart");
      return;
    }
    try {
      const res = await axios.post(
        `${backendUrl}/api/cart/add`,
        { itemId },
        { headers: { userid: userId, token } }
      );
      if (res.data.success) setCartItems(res.data.cartData);
      else toast.error(res.data.message || "Failed to add to cart");
    } catch (err) {
      toast.error(err.message);
      console.error(err);
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    const userId = localStorage.getItem("userId");
    if (!token || !userId) return;
    try {
      const res = await axios.post(
        `${backendUrl}/api/cart/update`,
        { itemId, quantity },
        { headers: { userid: userId, token } }
      );
      if (res.data.success) setCartItems(res.data.cartData);
      else toast.error(res.data.message || "Failed to update cart");
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  // ------------------ POLLING (EVERYTHING) ------------------
  useEffect(() => {
    const localToken = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    // Initial fetch
    getProductsData();
    if (localToken && userId) fetchCartData(userId, localToken);
    fetchPlusStatus();
    fetchOrders();

    // Poll every 10 seconds for everything
    const interval = setInterval(() => {
      getProductsData();
      if (localToken && userId) fetchCartData(userId, localToken);
      fetchPlusStatus();
      fetchOrders();
    }, 1000);

    return () => clearInterval(interval); // cleanup
  }, [token, backendUrl]);

  // ------------------ CART CALCULATIONS ------------------
  const getCartCount = () =>
    Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);

  const getCartAmount = () =>
    Object.entries(cartItems).reduce((total, [itemId, qty]) => {
      const product = products.find((p) => p._id === itemId);
      return product ? total + qty * product.price : total;
    }, 0);
    useEffect(() => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  if (!token || !userId) return;

  // Initial fetch of orders
  fetchOrders();

  // Polling every 5 seconds to get order status updates
  const interval = setInterval(() => {
    fetchOrders(); // ✅ reuses the existing function
  }, 5000);

  return () => clearInterval(interval); // cleanup on unmount
}, [backendUrl]); // backendUrl as dependency if it changes


  // ------------------ CONTEXT VALUE ------------------
  const value = {
    products,
    categories,
    cartItems,
    setCartItems,
    addToCart,
    updateQuantity,
    getCartCount,
    getCartAmount,
    orders, // ✅ exposed for order status updates
    navigate,
    backendUrl,
    delivery_fee,
    plusMember,
    setPlusMember,
    token,
    setToken,
    fetchCartData,
    fetchOrders,
    fetchPlusStatus,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
