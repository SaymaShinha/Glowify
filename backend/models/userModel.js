// models/User.js
import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  phone: String,
  address: String,
  city: String,
});

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },

    password: {
      type: String,
      required: true
    },

    skinType: {
      type: String,
      enum: ["oily", "dry", "combination"],
      required: true
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },

    addresses: [addressSchema],

    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);