import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    password: { type: String, required: function () { return !this.googleId; } },
    phone: {
      type: String,
      required: function () { return !this.googleId; },
      trim: true
    },
    googleId: { type: String, unique: true, sparse: true },
    resetPasswordToken: String,
    resetPasswordExpire: Date,

    role: {
      type: String,
      enum: ["buyer", "seller", "admin"],
      default: "buyer"
    }
  },
  { timestamps: true }
);




export default mongoose.model("User", userSchema);
