import Module from "../models/Module.js";

// Get all modules
export const getModules = async (req, res) => {
  try {
    const modules = await Module.find();
    res.json(modules);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create new module
export const createModule = async (req, res) => {
  try {
    const { name } = req.body;
    const module = new Module({ name });
    await module.save();
    res.status(201).json(module);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
