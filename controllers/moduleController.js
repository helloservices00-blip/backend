// controllers/moduleController.js
import Module from "../models/Module.js";

// Get all modules
export const getAllModules = async (req, res) => {
  try {
    const modules = await Module.find();
    res.json(modules);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Create module
export const createModule = async (req, res) => {
  try {
    const { name, description } = req.body;
    const module = await Module.create({ name, description });
    res.status(201).json(module);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update module
export const updateModule = async (req, res) => {
  try {
    const { id } = req.params;
    const module = await Module.findByIdAndUpdate(id, req.body, { new: true });
    res.json(module);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete module
export const deleteModule = async (req, res) => {
  try {
    await Module.findByIdAndDelete(req.params.id);
    res.json({ message: "Module deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
