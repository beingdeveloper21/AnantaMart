import mongoose from "mongoose";

const customerQuerySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  message: { type: String },
  type: { type: String, enum: ["Contact Specialist", "Custom Quote"], required: true },
  date: { type: Date, default: Date.now },
});

export default mongoose.model("CustomerQuery", customerQuerySchema);
