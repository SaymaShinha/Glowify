// routes/orderRoutes.js
import express from "express";
import {
  createOrder,
  getMyOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.post("/", protect, createOrder);
router.get("/user", protect, getMyOrders);
router.put("/:id", protect, isAdmin, updateOrderStatus);

export default router;