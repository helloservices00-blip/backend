import Order from "../models/Order.js";

export const getVendorOrders = async (req, res) => {
  try {
    const orders = await Order.find({ "items.vendorId": req.vendorId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, itemId } = req.params;
    const { status } = req.body;

    const order = await Order.findOne({ _id: orderId, "items._id": itemId });

    if (!order) return res.status(404).json({ message: "Order not found" });

    const item = order.items.id(itemId);

    if (item.vendorId.toString() !== req.vendorId) 
      return res.status(403).json({ message: "Not authorized" });

    item.status = status; // e.g., "Processing", "Shipped", "Delivered"
    await order.save();

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

