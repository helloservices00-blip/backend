import Subcategory from "../models/Subcategory.js";
import Category from "../models/Category.js";
import Module from "../models/Module.js";

export const createSubcategory = async (req, res) => {
  try {
    const { name, categoryId, moduleId } = req.body;

    // validate
    const category = await Category.findById(categoryId);
    if (!category) return res.status(400).json({ message: "Invalid category" });

    const module = await Module.findById(moduleId);
    if (!module) return res.status(400).json({ message: "Invalid module" });

    const newSubcategory = new Subcategory({
      name,
      categoryId,
      moduleId
    });

    await newSubcategory.save();
    res.status(201).json(newSubcategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSubcategories = async (req, res) => {
  try {
    const subcategories = await Subcategory.find()
      .populate("categoryId")
      .populate("moduleId");

    res.json(subcategories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
