// routes/plusRoutes.js
import express from "express";
import { subscribePlus, verifyPlusSubscription } from "../controllers/plusController.js";
import authUser from "../middlewares/auth.js";

const router = express.Router();

router.post("/subscribe", authUser, subscribePlus);
router.get("/verify", authUser, verifyPlusSubscription); // Called after Stripe payment success

export default router;
