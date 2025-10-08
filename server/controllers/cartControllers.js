// controllers/cartControllers.js
import userModel from "../models/userModel.js";

// Add item to cart
const addToCart = async (req, res) => {
  try {
    const userId = req.headers.userid; // ✅ get from headers
    const { itemId } = req.body;

    if (!userId || !itemId) {
      return res.status(400).json({ success: false, message: "Invalid input" });
    }

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {};
    cartData[itemId] = (cartData[itemId] || 0) + 1;

    await userModel.findByIdAndUpdate(userId, { cartData }, { new: true });
    res.json({ success: true, message: "Item added to cart", cartData });
  } catch (error) {
    console.error("Add to cart error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update item quantity
const updateCart = async (req, res) => {
  try {
    const userId = req.headers.userid; // ✅ get from headers
    const { itemId, quantity } = req.body;

    if (!userId || !itemId || quantity === undefined) {
      return res.status(400).json({ success: false, message: "Invalid input" });
    }

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {};
    if (quantity === 0) delete cartData[itemId];
    else cartData[itemId] = quantity;

    await userModel.findByIdAndUpdate(userId, { cartData }, { new: true });
    res.json({ success: true, message: "Cart updated", cartData });
  } catch (error) {
    console.error("Update cart error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get user cart
const getUserCart = async (req, res) => {
  try {
    const userId = req.headers.userid; // ✅ get from headers
    if (!userId) return res.status(400).json({ success: false, message: "User ID required" });

    const userData = await userModel.findById(userId);
    if (!userData) return res.status(404).json({ success: false, message: "User not found" });

    res.json({ success: true, cartData: userData.cartData || {} });
  } catch (error) {
    console.error("Get cart error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { addToCart, updateCart, getUserCart };
