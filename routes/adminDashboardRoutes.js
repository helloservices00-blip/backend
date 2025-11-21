import express from "express";
import { adminAuth } from "../middleware/adminAuth.js";
import { getDashboardStats } from "../controllers/adminDashboardController.js";

const router = express.Router();

router.get("/", adminAuth, getDashboardStats);

export default router;

