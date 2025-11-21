import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
  try {
    const { search, module, category, subcategory, sort } = req.query;

    let filter = {};

    if (search) filter.name = { $regex: search, $options: "i" };
    if (module) filter.module = module;
    if (category) filter.category = category;
    if (subcategory) filter.subcategory = subcategory;

    let query = Product.find(filter)
      .populate("module")
      .populate("category")
      .populate("subcategory");

    if (sort === "priceAsc") query = query.sort({ price: 1 });
    if (sort === "priceDesc") query = query.sort({ price: -1 });
    if (sort === "newest") query = query.sort({ createdAt: -1 });

    const products = await query;

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("module")
      .populate("category")
      .populate("subcategory");

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

