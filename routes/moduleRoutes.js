import express from "express";
import adminAuth from "../middleware/adminAuth.js";
import { getModules, addModule, updateModule, deleteModule } from "../controllers/moduleController.js";

const router = express.Router();

router.get("/", getModules);
router.post("/", adminAuth, addModule);
router.put("/:id", adminAuth, updateModule);
router.delete("/:id", adminAuth, deleteModule);

export default router;

