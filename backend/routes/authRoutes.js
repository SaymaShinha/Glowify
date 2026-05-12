// routes/authRoutes.js
import express from "express";
import { register, login } from "../controllers/authController.js";
import multer from "multer";

const upload = multer();

const router = express.Router();

router.post("/register", upload.none(), register);
router.post("/login", upload.none(), login);

export default router;