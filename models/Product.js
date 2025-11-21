import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: Number,
  images: [String],
  module: { type: mongoose.Schema.Types.ObjectId, ref: "Module" },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  subcategory: { type: mongoose.Schema.Types.ObjectId, ref: "Subcategory" },
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor" },
}, { timestamps: true });

export default mongoose.model("Product", ProductSchema);
