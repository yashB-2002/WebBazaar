const User = require("../models/userModel");

const getUserController = async (req, res) => {
  try {
    const users = await User.find({}).select("-password -createdAt -updatedAt");
    return res.status(201).json({
      success: true,
      message: "Fetched user successfully.",
      resultCount: users.length,
      users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error,
      message: "error in fetching users",
    });
  }
};

module.exports = getUserController;
