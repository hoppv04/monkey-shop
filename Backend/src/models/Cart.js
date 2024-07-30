import mongoose, { Schema } from "mongoose";

const CartItem = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  quantity: Number,
});

const cartSchema = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    products: [CartItem],
    totalPrice: Number,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Cart", cartSchema);
