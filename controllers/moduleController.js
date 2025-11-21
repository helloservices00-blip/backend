import Module from "../models/Module.js";

export const getModules = async (req, res) => {
  try {
    const modules = await Module.find();
    res.status(200).json(modules);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createModule = async (req, res) => {
  try {
    const { name, description } = req.body;
    const existing = await Module.findOne({ name });
    if (existing) return res.status(400).json({ message: "Module already exists" });

    const module = new Module({ name, description });
    await module.save();
    res.status(201).json(module);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateModule = async (req, res) => {
  try {
    const { id } = req.params;
    const module = await Module.findByIdAndUpdate(id, req.body, { new: true });
    if (!module) return res.status(404).json({ message: "Module not found" });
    res.status(200).json(module);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteModule = async (req, res) => {
  try {
    const { id } = req.params;
    await Module.findByIdAndDelete(id);
    res.status(200).json({ message: "Module deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
