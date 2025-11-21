import Order from "../models/Order.js";
import Product from "../models/Product.js";

export const placeOrder = async (req, res) => {
  try {
    const userId = req.userId;
    const { items, total, paymentStatus = "Pending" } = req.body;

    // attach vendorId for each item
    const itemsWithVendor = await Promise.all(
      items.map(async (i) => {
        const product = await Product.findById(i.productId);
        return {
          ...i,
          vendorId: product.vendorId,
        };
      })
    );

    const order = await Order.create({
      userId,
      items: itemsWithVendor,
      total,
      paymentStatus,
    });

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const userId = req.userId;

    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
