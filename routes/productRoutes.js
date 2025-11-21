import express from "express";
import multer from "multer";
import { getProducts, createProduct, updateProduct, deleteProduct } from "../controllers/productController.js";
import { adminAuth } from "../middleware/adminAuth.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.get("/", getProducts);
router.post("/", adminAuth, upload.array("images"), createProduct);
router.put("/:id", adminAuth, upload.array("images"), updateProduct);
router.delete("/:id", adminAuth, deleteProduct);

export default router;
