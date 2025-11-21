import Subcategory from "../models/Subcategory.js";

export const getSubcategories = async (req, res) => {
  try {
    const subcategories = await Subcategory.find().populate({
      path: "category",
      populate: { path: "module" }
    });
    res.status(200).json(subcategories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createSubcategory = async (req, res) => {
  try {
    const { name, category } = req.body;
    const existing = await Subcategory.findOne({ name });
    if (existing) return res.status(400).json({ message: "Subcategory already exists" });

    const subcategory = new Subcategory({ name, category });
    await subcategory.save();
    res.status(201).json(subcategory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateSubcategory = async (req, res) => {
  try {
    const { id } = req.params;
    const subcategory = await Subcategory.findByIdAndUpdate(id, req.body, { new: true });
    if (!subcategory) return res.status(404).json({ message: "Subcategory not found" });
    res.status(200).json(subcategory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteSubcategory = async (req, res) => {
  try {
    const { id } = req.params;
    await Subcategory.findByIdAndDelete(id);
    res.status(200).json({ message: "Subcategory deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
