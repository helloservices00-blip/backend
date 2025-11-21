import Subcategory from "../models/Subcategory.js";

export const getSubcategories = async (req, res) => {
  const subcategories = await Subcategory.find();
  res.json(subcategories);
};

export const addSubcategory = async (req, res) => {
  const subcategory = await Subcategory.create(req.body);
  res.json(subcategory);
};

export const updateSubcategory = async (req, res) => {
  const subcategory = await Subcategory.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(subcategory);
};

export const deleteSubcategory = async (req, res) => {
  await Subcategory.findByIdAndDelete(req.params.id);
  res.json({ message: "Subcategory deleted" });
};

