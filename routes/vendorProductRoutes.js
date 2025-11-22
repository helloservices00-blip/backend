import express from "express";
import Product from "../models/Product.js";
import vendorAuth from "../middleware/vendorAuth.js"; // ensure this exists

const router = express.Router();

// ➤ VENDOR ADDS PRODUCT
router.post("/add", vendorAuth, async (req, res) => {
  try {
    const vendorId = req.vendor._id; // from token

    const { moduleId, categoryId, subcategoryId, name, price } = req.body;

    if (!moduleId || !categoryId || !subcategoryId)
      return res.status(400).json({ message: "Select module/category/subcategory" });

    const product = new Product({
      ...req.body,
      vendorId: vendorId,
    });

    await product.save();

    res.json({ message: "Product added", product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ➤ VENDOR GET OWN PRODUCTS
router.get("/my-products", vendorAuth, async (req, res) => {
  try {
    const products = await Product.find({ vendorId: req.vendor._id });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
