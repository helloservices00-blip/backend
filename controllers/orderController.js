import { sendEmail } from "../utils/email.js";
import Vendor from "../models/Vendor.js";

export const createOrderFromStripe = async (req, res) => {
  try {
    const { session_id } = req.body;
    // fetch Stripe session details
    // create Order in DB
    const order = await Order.create({ /* ...order data */ });

    // Send email to user
    await sendEmail(order.userEmail, "Order Confirmation", `<p>Your order #${order._id} has been placed!</p>`);

    // Notify vendors
    const vendorIds = [...new Set(order.items.map(i => i.vendorId))];
    const vendors = await Vendor.find({ _id: { $in: vendorIds } });
    for (const v of vendors) {
      await sendEmail(v.email, "New Order Received", `<p>You have a new order containing your products.</p>`);
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

