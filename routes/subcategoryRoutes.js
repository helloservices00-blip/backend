import express from "express";
import { getSubcategories, createSubcategory, updateSubcategory, deleteSubcategory } from "../controllers/subcategoryController.js";
import { adminAuth } from "../middleware/adminAuth.js";

const router = express.Router();

router.get("/", getSubcategories);
router.post("/", adminAuth, createSubcategory);
router.put("/:id", adminAuth, updateSubcategory);
router.delete("/:id", adminAuth, deleteSubcategory);

export default router;
