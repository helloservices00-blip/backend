import Vendor from "../models/Vendor.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const vendorLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const vendor = await Vendor.findOne({ email });

    if (!vendor) return res.status(400).json({ message: "Vendor not found" });

    const isMatch = await bcrypt.compare(password, vendor.password);

    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign(
      { vendorId: vendor._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      vendor: {
        id: vendor._id,
        name: vendor.name,
        email: vendor.email,
      },
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
