import mongoose from "mongoose";

const planSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  validity: {
    type: String,
    required: true
  },
  data: {
    type: String,
    required: true
  },
  calls: {
    type: String,
    default: "Unlimited Calls"
  },
  sms: {
    type: String,
    default: "100 SMS/day"
  }
});

export default mongoose.model("Plan", planSchema);
