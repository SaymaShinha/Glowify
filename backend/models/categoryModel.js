// models/Category.js
import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    description: {
      type: String
    },

    image: {
      type: String // store image URL
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Category", categorySchema);