import express from "express";
import {
  placeOrder,
  placeOrderStripe,
  allOrders,
  userOrders,
  updateStatus,
  returnOrder,
  verifyStripe,
  cancelOrder,
   approveReturn
} from "../controllers/orderControllers.js";

import adminAuth from "../middlewares/adminAuth.js";
import authUser from "../middlewares/auth.js";

const orderRouter = express.Router();

// Admin routes
orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus);

// User routes
orderRouter.post("/place", authUser, placeOrder);
orderRouter.post("/stripe", authUser, placeOrderStripe);
orderRouter.get("/userorders", authUser, userOrders);
orderRouter.post("/verifyStripe", authUser, verifyStripe);
orderRouter.post("/cancel", authUser, cancelOrder);
orderRouter.post("/return", authUser, returnOrder);
orderRouter.post("/approveReturn", adminAuth, approveReturn);

export default orderRouter;
