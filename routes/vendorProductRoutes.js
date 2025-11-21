import express from "express";
import vendorAuth from "../middleware/vendorAuth.js";
import { getVendorProducts, addProduct, updateProduct, deleteProduct } from "../controllers/vendorProductController.js";

const router = express.Router();

router.get("/", vendorAuth, getVendorProducts); // list vendor products
router.post("/", vendorAuth, addProduct); // add product
router.put("/:id", vendorAuth, updateProduct); // update product
router.delete("/:id", vendorAuth, deleteProduct); // delete product

export default router;

