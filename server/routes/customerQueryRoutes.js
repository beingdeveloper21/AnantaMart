import express from "express";
import { addQuery, getQueries, deleteQuery } from "../controllers/customerQueryControllers.js";
import adminAuth  from "../middlewares/adminAuth.js"; // ensure this exists
const router = express.Router();

// Public route: user submits query
router.post("/add", addQuery);

// Admin routes
router.get("/list", adminAuth, getQueries);
router.delete("/delete/:id", adminAuth, deleteQuery);

export default router;
