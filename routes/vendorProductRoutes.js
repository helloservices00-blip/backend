import express from "express";
import Product from "../models/Product.js";
import Vendor from "../models/Vendor.js";
import authVendorMiddleware from "../middleware/authVendorMiddleware.js";

const router = express.Router();

// ------------------------------
// ADD PRODUCT (Vendor Only)
// ------------------------------
router.post("/add", authVendorMiddleware, async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      module,
      category,
      subcategory,
      images,
      stock,
    } = req.body;

    // Vendor comes from token
    const vendorId = req.vendor.id;

    const newProduct = new Product({
      name,
      description,
      price,
      module,
      category,
      subcategory,
      images,
      vendorId,
      stock,
    });

    await newProduct.save();

    res.status(201).json({
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// ------------------------------
// GET ALL PRODUCTS FOR LOGGED-IN VENDOR
// ------------------------------
router.get("/my-products", authVendorMiddleware, async (req, res) => {
  try {
    const vendorId = req.vendor.id;

    const products = await Product.find({ vendorId });

    res.json(products);
  } catch (error) {
    console.error("Error fetching vendor products:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// ------------------------------
// UPDATE PRODUCT (Vendor Only)
// ------------------------------
router.put("/update/:id", authVendorMiddleware, async (req, res) => {
  try {
    const vendorId = req.vendor.id;

    const product = await Product.findOne({
      _id: req.params.id,
      vendorId,
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    Object.assign(product, req.body);
    await product.save();

    res.json({ message: "Product updated", product });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// ------------------------------
// DELETE PRODUCT (Vendor Only)
// ------------------------------
router.delete("/delete/:id", authVendorMiddleware, async (req, res) => {
  try {
    const vendorId = req.vendor.id;

    const product = await Product.findOneAndDelete({
      _id: req.params.id,
      vendorId,
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
