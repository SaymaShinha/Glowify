// routes/productRoutes.js
import express from "express";
import {
  getProducts,
  createProduct,
  getProductByID,
} from "../controllers/productController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/adminMiddleware.js";
import upload  from "../middlewares/upload.js";

const router = express.Router();

router.get("/", getProducts);
router.post(
  "/",
  protect,
  isAdmin,
  upload.array("images", 5),
  createProduct
);
router.get("/:id",getProductByID)

export default router;