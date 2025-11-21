import express from "express";
import adminAuth from "../middleware/adminAuth.js";
import { getSubcategories, addSubcategory, updateSubcategory, deleteSubcategory } from "../controllers/subcategoryController.js";

const router = express.Router();

router.get("/", getSubcategories);
router.post("/", adminAuth, addSubcategory);
router.put("/:id", adminAuth, updateSubcategory);
router.delete("/:id", adminAuth, deleteSubcategory);

export default router;

