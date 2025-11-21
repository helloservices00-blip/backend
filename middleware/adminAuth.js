import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const adminAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if(!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    if(!req.user || !req.user.isAdmin) return res.status(403).json({ message: "Forbidden" });

    next();
  } catch(err) {
    res.status(401).json({ message: "Unauthorized", error: err.message });
  }
};
