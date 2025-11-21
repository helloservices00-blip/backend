// middleware/adminAuth.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const adminAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await User.findById(decoded.id);
    if (!admin || !admin.isAdmin) return res.status(403).json({ message: "Forbidden" });

    req.admin = admin;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
