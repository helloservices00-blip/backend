import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  module: { type: mongoose.Schema.Types.ObjectId, ref: "Module" }
}, { timestamps: true });

export default mongoose.model("Category", CategorySchema);
