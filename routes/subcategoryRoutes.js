import express from "express";
import Subcategory from "../models/Subcategory.js";

const router = express.Router();

// Create Subcategory
router.post("/", async (req, res) => {
  try {
    const sub = new Subcategory(req.body);
    await sub.save();
    res.status(201).json(sub);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all Subcategories
router.get("/", async (req, res) => {
  try {
    const data = await Subcategory.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
