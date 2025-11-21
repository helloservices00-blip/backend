import express from "express";
import { getModules, createModule, updateModule, deleteModule } from "../controllers/moduleController.js";
import { adminAuth } from "../middleware/adminAuth.js";

const router = express.Router();

router.get("/", getModules);
router.post("/", adminAuth, createModule);
router.put("/:id", adminAuth, updateModule);
router.delete("/:id", adminAuth, deleteModule);

export default router;
