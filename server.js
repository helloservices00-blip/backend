import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

// Routes
import authRoutes from "./routes/authRoutes.js";
import vendorAuthRoutes from "./routes/vendorAuthRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import vendorProductRoutes from "./routes/vendorProductRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import checkoutRoutes from "./routes/checkoutRoutes.js";
import moduleRoutes from "./routes/moduleRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import subcategoryRoutes from "./routes/subcategoryRoutes.js";
import adminDashboardRoutes from "./routes/adminDashboardRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Mount Routes
app.use("/api/auth", authRoutes);
app.use("/api/vendor-auth", vendorAuthRoutes);
app.use("/api/products", productRoutes);
app.use("/api/vendor-products", vendorProductRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/modules", moduleRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/subcategories", subcategoryRoutes);
app.use("/api/admin/dashboard", adminDashboardRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.log(err));
