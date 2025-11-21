import mongoose from "mongoose";

const ModuleSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String }
}, { timestamps: true });

export default mongoose.model("Module", ModuleSchema);
