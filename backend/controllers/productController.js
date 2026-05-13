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

// GET PRODUCT BY ID
export const getProductByID = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// CREATE PRODUCT
export const createProduct = async (req, res) => {
  try {
    // Generate image URLs
    //const imageUrls = req.files.map(
    //(file) => file.path
    //(file) =>
    //`${process.env.BASE_URL}/products/${file.filename}`
    //)

    const imageUrls = req.files.map(
      (file) => file.path
    );

    console.log(req.files);
    console.log(req.body);

    console.log(imageUrls);

    // Create product
    const product = await Product.create({
      ...req.body,
      skinType: req.body.skinType.toLowerCase(),
      images: imageUrls,
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

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await Product.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
}

export const updateProduct = async (req, res) => {

  try {

    const { id } = req.params;

    let updateData = {
      ...req.body,
    };

    // parse ingredients
    if (req.body.ingredients) {
      updateData.ingredients = JSON.parse(
        req.body.ingredients
      );
    }

    // new uploaded images
    if (req.files?.length > 0) {

      updateData.images = req.files.map(
        (file) => file.path
      );

    }

    const updatedProduct =
      await Product.findByIdAndUpdate(
        id,
        updateData,
        { new: true }
      );

    res.status(200).json({
      success: true,
      data: updatedProduct,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};