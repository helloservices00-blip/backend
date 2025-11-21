// controllers/vendorProductController.js
import Product from "../models/Product.js";
import fs from "fs";
import path from "path";

// Create product (by vendor)
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, module, category, subcategory } = req.body;
    const vendorId = req.vendor._id;

    const images = [];
    if (req.files) {
      req.files.forEach(file => {
        images.push(`/uploads/${file.filename}`);
      });
    }

    const product = await Product.create({
      name,
      description,
      price,
      module,
      category,
      subcategory,
      vendor: vendorId,
      images,
    });

    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get products of the logged-in vendor
export const getProductsByVendor = async (req, res) => {
  try {
    const products = await Product.find({ vendor: req.vendor._id })
      .populate("module category subcategory vendor");
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ _id: id, vendor: req.vendor._id });
    if (!product) return res.status(404).json({ message: "Product not found" });

    const { name, description, price, module, category, subcategory } = req.body;
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.module = module || product.module;
    product.category = category || product.category;
    product.subcategory = subcategory || product.subcategory;

    if (req.files && req.files.length > 0) {
      // Remove old images from uploads
      product.images.forEach(img => {
        const filePath = path.join("uploads", path.basename(img));
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      });
      product.images = req.files.map(file => `/uploads/${file.filename}`);
    }

    await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ _id: id, vendor: req.vendor._id });
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Remove images from uploads
    product.images.forEach(img => {
      const filePath = path.join("uploads", path.basename(img));
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    });

    await product.remove();
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
