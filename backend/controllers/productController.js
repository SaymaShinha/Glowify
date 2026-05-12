import Product from "../models/productModel.js";

// GET ALL PRODUCTS
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get product by ID
export const getProductByID = async (req, res) => {
  const { id } = req.params

  try {
    const product = await Product.findById( id );

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    throw error;
  }
}

// CREATE PRODUCT
export const createProduct = async (req, res) => {
  try {
    console.log(req.body);
    const { name, price, discount, category, skinType, stock, ingredients, description, images } = req.body;


    // make image files and path start
    try {
      const imageUrls = req.files.map(
        (file) =>
          `${process.env.BASE_URL}/products/${file.filename}`
      );

      const product = await Product.create({
        ...req.body,
        images: imageUrls,
      });

      res.status(201).json(product);

    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
    // image files and path end

    const product = await Product.create({
      name: name,
      price: price,
      discount: discount,
      category: category,
      skinType: skinType.toLowerCase(),
      stock: stock,
      ingredients: ingredients,
      description: description,
      imageUrls: imageUrls,
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};