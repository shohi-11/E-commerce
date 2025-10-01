import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },         // user who placed the order
    products: [
      {
        productId: { type: String },
        name: { type: String },
        quantity: { type: Number, default: 1 },
        price: { type: Number }
      }
    ],
    total: { type: Number, required: true },
    status: { type: String, default: "Pending" }
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);