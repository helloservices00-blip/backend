import express from "express";
import { vendorAuth } from "../middleware/vendorAuth.js";
import {
  createProduct,
  getProductsByVendor,
  updateProduct,
  deleteProduct,
} from "../controllers/vendorProductController.js";

const router = express.Router();

router.post("/", vendorAuth, createProduct);
router.get("/", vendorAuth, getProductsByVendor);
router.put("/:id", vendorAuth, updateProduct);
router.delete("/:id", vendorAuth, deleteProduct);

export default router;
