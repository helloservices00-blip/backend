import Vendor from "../models/Vendor.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export const registerVendor = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const exists = await Vendor.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email exists" });

    const vendor = await Vendor.create({ name, email, password });
    const token = jwt.sign({ vendorId: vendor._id }, JWT_SECRET, { expiresIn: "7d" });

    res.json({ vendor, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginVendor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const vendor = await Vendor.findOne({ email });
    if (!vendor) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await vendor.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ vendorId: vendor._id }, JWT_SECRET, { expiresIn: "7d" });

    res.json({ vendor, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

