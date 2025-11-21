import Vendor from "../models/Vendor.js";
import jwt from "jsonwebtoken";

export const registerVendor = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existing = await Vendor.findOne({ email });
    if(existing) return res.status(400).json({ message: "Email already exists" });

    const vendor = new Vendor({ name, email, password });
    await vendor.save();

    const token = jwt.sign({ id: vendor._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.status(201).json({ vendor, token });
  } catch(err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

export const loginVendor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const vendor = await Vendor.findOne({ email });
    if(!vendor) return res.status(400).json({ message: "Vendor not found" });

    const match = await vendor.comparePassword(password);
    if(!match) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign({ id: vendor._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.status(200).json({ vendor, token });
  } catch(err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};
