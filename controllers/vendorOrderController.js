// controllers/vendorOrderController.js
import Order from "../models/Order.js";

// Get orders for logged-in vendor
export const getVendorOrders = async (req, res) => {
  try {
    const orders = await Order.find({ vendor: req.vendor._id })
      .populate("user products");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
