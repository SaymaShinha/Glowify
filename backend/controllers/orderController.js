// controllers/orderController.js
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";

export const createOrder = async (req, res) => {
  try {
    const { items, shippingAddress } = req.body;

    // build snapshot
    const detailedItems = await Promise.all(
      items.map(async (item) => {
        const product = await Product.findById(item.productId);

        return {
          productId: product._id,
          name: product.name,
          price: product.price,
          quantity: item.quantity,
          image: product.images[0],
        };
      })
    );

    const totalPrice = detailedItems.reduce(
      (sum, i) => sum + i.price * i.quantity,
      0
    );

    const order = await Order.create({
      userId: req.user._id,
      items: detailedItems,
      totalPrice,
      shippingAddress,
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMyOrders = async (req, res) => {
  const orders = await Order.find({ userId: req.user._id });
  res.json(orders);
};

export const updateOrderStatus = async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
  res.json(order);
};