// models/Product.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    price: {
      type: Number,
      required: true
    },

    discount: {
      type: Number,
      default: 0
    },

    category: {
      type: String,
      required: true
    },

    skinType: {
      type: String,
      enum: ["oily", "dry", "combination", "all"],
      default: "all"
    },

    ingredients: [
      {
        type: String
      }
    ],

    stock: {
      type: Number,
      required: true,
      default: 0
    },

    images: [
      {
        type: String 
      }
    ],

    description: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Product", productSchema);