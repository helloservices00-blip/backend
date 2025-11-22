import express from "express";
import Module from "../models/Module.js";
import Category from "../models/Category.js";
import SubCategory from "../models/SubCategory.js";
import Product from "../models/Product.js";

const router = express.Router();

router.get("/tree", async (req, res) => {
  try {
    const modules = await Module.find();

    const tree = [];

    for (const mod of modules) {
      const categories = await Category.find({ moduleId: mod._id });

      const catData = [];

      for (const cat of categories) {
        const subcategories = await SubCategory.find({ categoryId: cat._id });

        const subData = [];

        for (const sub of subcategories) {
          const products = await Product.find({ subcategoryId: sub._id });

          subData.push({
            subcategory: sub.name,
            subcategoryId: sub._id,
            products: products,
          });
        }

        catData.push({
          category: cat.name,
          categoryId: cat._id,
          subcategories: subData,
        });
      }

      tree.push({
        module: mod.name,
        moduleId: mod._id,
        categories: catData,
      });
    }

    res.json(tree);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
