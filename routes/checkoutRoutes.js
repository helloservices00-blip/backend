import express from "express";
import auth from "../middleware/auth.js";
import { createCheckoutSession } from "../controllers/checkoutController.js";

const router = express.Router();

router.post("/create-session", auth, createCheckoutSession);

export default router;

