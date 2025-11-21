import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("module")
      .populate("category")
      .populate("subcategory")
      .populate("vendor");
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, module, category, subcategory, vendor } = req.body;
    const images = req.files ? req.files.map(f => f.path.replace("\\","/")) : [];

    const product = new Product({ name, description, price, module, category, subcategory, vendor, images });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };
    if(req.files) updateData.images = req.files.map(f => f.path.replace("\\","/"));

    const product = await Product.findByIdAndUpdate(id, updateData, { new: true });
    if(!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch(err){
    res.status(500).json({ message: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  try{
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "Product deleted" });
  }catch(err){
    res.status(500).json({ message: err.message });
  }
};
