import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// Simple admin middleware based on JWT
export default function adminAuth(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // For demo, assume adminId=1 is admin
    if (!decoded.isAdmin) return res.status(403).json({ message: "Forbidden" });
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
}

