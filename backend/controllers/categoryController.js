import Category from "../models/categoryModel.js";


// CREATE CATEGORY
export const createCategory = async (req, res) => {
  try {
    const name = req.body.name;

    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const category = await Category.create({
      name: req.body.name,
      description: req.body.description,

      // single image
      image: req.file.path,
    });

    res.status(201).json({
      success: true,
      data: category,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL CATEGORIES
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    res.status(200).json({
      success: true,
      data: categories,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

export const deleteCategories = async(req, res) => {
  try {
    const { id } = req.params;

    await Category.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
}