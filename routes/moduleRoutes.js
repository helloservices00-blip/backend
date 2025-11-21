import express from "express";
import { adminAuth } from "../middleware/adminAuth.js";
import {
  getAllModules,
  createModule,
  updateModule,
  deleteModule,
} from "../controllers/moduleController.js";

const router = express.Router();

router.get("/", adminAuth, getAllModules);
router.post("/", adminAuth, createModule);
router.put("/:id", adminAuth, updateModule);
router.delete("/:id", adminAuth, deleteModule);

export default router;
