// controllers/categoryController.js
import Category from "../models/Category.js";

export const getCategories = async (req, res) => {
  const data = await Category.find();
  res.json(data);
};

export const createCategory = async (req, res) => {
  const category = await Category.create(req.body);
  res.json(category);
};