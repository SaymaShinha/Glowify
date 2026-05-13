import express from "express";
import getUpload from "../middlewares/upload.js";

import {
    createCategory,
    getCategories,
    deleteCategories,
} from "../controllers/categoryController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/adminMiddleware.js";



const upload = getUpload();
const router = express.Router();

router.post("/", upload.single("image"), createCategory);

router.get("/", getCategories);

router.delete("/:id", protect, isAdmin, deleteCategories);

export default router;