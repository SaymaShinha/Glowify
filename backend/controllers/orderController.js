// controllers/orderController.js
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";

export const createOrder = async (req, res) => {
  try {

    const {
      name,
      email,
      address,
      city,
      phone,
      total,
    } = req.body;

    // Convert string back to array
    const items = JSON.parse(req.body.items);

    console.log(req.body);

    // Build product snapshot
    const detailedItems = await Promise.all(
      items.map(async (item) => {

        const product = await Product.findById(item._id);

        return {
          productId: product._id,
          name: product.name,
          price: product.price,
          quantity: item.quantity,
          image: product.images[0],
        };
      })
    );

    // Calculate total
    const totalPrice = detailedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // Create order
    const order = await Order.create({
      userId: req.user._id,

      items: detailedItems,

      totalPrice,

      shippingAddress: {
        name,
        email,
        phone,
        address,
        city,
      },
    });

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      data: order,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};

export const getOrders = async (req, res) => {
  try {

    const orders = await Order.find();

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    await Order.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Order deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

export const getMyOrders = async (req, res) => {
  const orders = await Order.find({ userId: req.user._id });
  res.json(orders);
};

export const getSingleOrder = async (req, res) => {
  const { id } = req.params;
  const orders = await Order.find({ _id: id })
  res.json(orders);
}
