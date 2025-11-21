import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Import routes
import authRoutes from "./routes/authRoutes.js";
import vendorAuthRoutes from "./routes/vendorAuthRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import vendorProductRoutes from "./routes/vendorProductRoutes.js";
import vendorOrderRoutes from "./routes/vendorOrderRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import checkoutRoutes from "./routes/checkoutRoutes.js";
import moduleRoutes from "./routes/moduleRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import subcategoryRoutes from "./routes/subcategoryRoutes.js";
import adminDashboardRoutes from "./routes/adminDashboardRoutes.js";

app.use("/auth", authRoutes);
app.use("/vendor/auth", vendorAuthRoutes);
app.use("/products", productRoutes);
app.use("/vendor/products", vendorProductRoutes);
app.use("/vendor/orders", vendorOrderRoutes);
app.use("/orders", orderRoutes);
app.use("/checkout", checkoutRoutes);
app.use("/modules", moduleRoutes);
app.use("/categories", categoryRoutes);
app.use("/subcategories", subcategoryRoutes);
app.use("/admin/dashboard", adminDashboardRoutes);

// Error Handler
import errorHandler from "./middleware/errorHandler.js";
app.use(errorHandler);

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
