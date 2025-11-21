import User from "../models/User.js";
import Vendor from "../models/Vendor.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";
import Module from "../models/Module.js";
import Category from "../models/Category.js";
import Subcategory from "../models/Subcategory.js";

// Get counts and stats
export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalVendors = await Vendor.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalModules = await Module.countDocuments();
    const totalCategories = await Category.countDocuments();
    const totalSubcategories = await Subcategory.countDocuments();

    res.status(200).json({
      totalUsers,
      totalVendors,
      totalProducts,
      totalOrders,
      totalModules,
      totalCategories,
      totalSubcategories
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
