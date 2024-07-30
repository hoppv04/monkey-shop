import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "member",
      enum: ["member", "admin"],
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    cart: {
      type: Schema.Types.ObjectId,
      ref: "Cart",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("User", userSchema);
