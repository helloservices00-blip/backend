import express from "express";
import { placeOrder, getUserOrders } from "../controllers/orderController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, placeOrder); // place order
router.get("/", auth, getUserOrders); // get user orders

export default router;

