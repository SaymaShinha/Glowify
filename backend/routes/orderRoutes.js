// routes/orderRoutes.js
import express from "express";
import {
  createOrder,
  getOrders,
  getMyOrders,
  deleteOrder,
  getSingleOrder,
  updateOrderStatus
} from "../controllers/orderController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/adminMiddleware.js";
import multer from "multer";

const upload = multer();

const router = express.Router();

router.post("/", upload.none(), protect, createOrder);

router.get("/", protect, isAdmin, getOrders);
router.get("/user/:id", protect, getMyOrders);
router.get("/:id", protect, isAdmin, getSingleOrder);

router.put("/:id", protect, isAdmin, updateOrderStatus);

router.delete("/:id", protect, isAdmin, deleteOrder);


export default router;