import express from "express";
import { auth } from "../middleware/auth.js";
import { login, register } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/profile", auth, (req, res) => {
  res.json(req.user);
});

export default router;
