import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";

import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import userRoutes from "./routes/userRoutes.js";

import { errorHandler } from "./middlewares/errorMiddleware.js";
import { notFound } from "./middlewares/notFound.js";
import rateLimiter from "./middlewares/rateLimiter.js";

import connectDatabase from "./config/database.js";

const app = express();

app.use(cors());

app.use(cors({
  origin: [
    "https://glowify-cosmetics.netlify.app",
    "https://glowify-eight.vercel.app"
  ],
  credentials: true
}));

// rate limit
app.use(rateLimiter);

// static images
app.use(
  "/products",
  express.static(
    path.join(process.cwd(), "backend/products")
  )
);

// routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Glowify API running...");
});

// DB connect
connectDatabase();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

// error handling
app.use(notFound);
app.use(errorHandler);