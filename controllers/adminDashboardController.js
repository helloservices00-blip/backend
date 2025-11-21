import User from "../models/User.js";
import Vendor from "../models/Vendor.js";
import Order from "../models/Order.js";

export const getUsers = async (req, res) => {
  const users = await User.find().sort({ createdAt: -1 });
  res.json(users);
};

export const getVendors = async (req, res) => {
  const vendors = await Vendor.find().sort({ createdAt: -1 });
  res.json(vendors);
};

export const getOrders = async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json(orders);
};

export const getAnalytics = async (req, res) => {
  const totalUsers = await User.countDocuments();
  const totalVendors = await Vendor.countDocuments();
  const totalOrders = await Order.countDocuments();
  const totalSalesAgg = await Order.aggregate([
    { $unwind: "$items" },
    { $group: { _id: null, totalSales: { $sum: { $multiply: ["$items.price", "$items.qty"] } } } }
  ]);
  const totalSales = totalSalesAgg[0]?.totalSales || 0;

  res.json({ totalUsers, totalVendors, totalOrders, totalSales });
};

