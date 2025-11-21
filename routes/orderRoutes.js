import express from "express";
import { auth } from "../middleware/auth.js";
import { adminAuth } from "../middleware/adminAuth.js";
import { createOrder, getUserOrders, getAllOrders, updateOrderStatus } from "../controllers/orderController.js";

const router = express.Router();

// User routes
router.post("/", auth, createOrder);
router.get("/my-orders", auth, getUserOrders);

// Admin routes
router.get("/", adminAuth, getAllOrders);
router.put("/:id/status", adminAuth, updateOrderStatus);

export default router;
