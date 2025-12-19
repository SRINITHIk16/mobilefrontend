import mongoose from "mongoose";

const rechargeSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  mobile: String,
  planId: mongoose.Schema.Types.ObjectId,
  amount: Number,
  date: { type: Date, default: Date.now }
});

export default mongoose.model("Recharge", rechargeSchema);
