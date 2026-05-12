// controllers/userController.js
import User from "../models/userModel.js";

export const getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

export const updateProfile = async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    req.body,
    { new: true }
  );
  res.json(user);
};
