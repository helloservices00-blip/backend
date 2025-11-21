import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  products: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    quantity: { type: Number, default: 1 }
  }],
  totalPrice: { type: Number },
  status: { type: String, default: "pending" },
}, { timestamps: true });

export default mongoose.model("Order", OrderSchema);

