import Product from "../models/Product.js";

export const getVendorProducts = async (req, res) => {
  try {
    const products = await Product.find({ vendorId: req.vendorId });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addProduct = async (req, res) => {
  try {
    const product = await Product.create({ ...req.body, vendorId: req.vendorId });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, vendorId: req.vendorId },
      req.body,
      { new: true }
    );
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await Product.findOneAndDelete({ _id: req.params.id, vendorId: req.vendorId });
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

