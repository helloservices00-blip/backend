import Module from "../models/Module.js";

export const getModules = async (req, res) => {
  const modules = await Module.find();
  res.json(modules);
};

export const addModule = async (req, res) => {
  const module = await Module.create(req.body);
  res.json(module);
};

export const updateModule = async (req, res) => {
  const module = await Module.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(module);
};

export const deleteModule = async (req, res) => {
  await Module.findByIdAndDelete(req.params.id);
  res.json({ message: "Module deleted" });
};

