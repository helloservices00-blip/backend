import express from "express";
import { createModule, getModules } from "../controllers/moduleController.js";

const router = express.Router();

router.post("/", createModule);
router.get("/", getModules);

export default router;
