import express from "express";
import {
  getProducts,
  createProduct,
  getProductByID,
  deleteProduct,
  updateProduct
} from "../controllers/productController.js";
import getUpload from "../middlewares/upload.js";
import { protect } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/adminMiddleware.js";

const router = express.Router();
const upload = getUpload();

router.get("/", getProducts);

router.post(
  "/",
  upload.array("images", 10),
  createProduct
);

router.get("/:id", getProductByID);
router.delete("/:id", protect, isAdmin, deleteProduct);
router.put("/:id", upload.array("images", 5), updateProduct);

export default router;