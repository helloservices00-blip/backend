import jwt from "jsonwebtoken";
import Vendor from "../models/Vendor.js";

export const vendorAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if(!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.vendor = await Vendor.findById(decoded.id);
    if(!req.vendor) return res.status(401).json({ message: "Invalid token" });

    next();
  } catch(err) {
    res.status(401).json({ message: "Unauthorized", error: err.message });
  }
};
