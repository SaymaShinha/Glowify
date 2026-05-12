// middleware/errorMiddleware.js
export const errorHandler = (err, req, res, next) => {
  console.error(err);

  res.status(res.statusCode || 500).json({
    message: err.message || "Server Error",
  });
};