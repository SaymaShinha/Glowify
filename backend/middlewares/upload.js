// middleware/upload.js

import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure folder exists
const uploadPath = "public/products";

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// Storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },

  filename: (req, file, cb) => {
    const productName = req.body.name
      ? req.body.name
          .toLowerCase()
          .replace(/\s+/g, "-")
      : "product";

    const uniqueName =
      `${productName}-${Date.now()}` +
      path.extname(file.originalname);

    cb(null, uniqueName);
  },
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes =
    /jpeg|jpg|png|jfif|webp/;

  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );

  const mimetype = allowedTypes.test(
    file.mimetype
  );

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Only jpg, jpeg, png, jfif, webp images are allowed"
      )
    );
  }
};

// Multer upload middleware
const upload = multer({
  storage,

  limits: {
    fileSize: 5 * 1024 * 1024,
  },

  fileFilter,
});

export default upload;