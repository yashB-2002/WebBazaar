const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const protectingRoutes = async (req, _, next) => {
  try {
    const token = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
    req.user = token;
    next();
  } catch (e) {
    console.log(e);
  }
};

const isAdmin = async (req, res, next) => {
  const admin = await User.findById(req.user._id);
  if (admin.role !== 1) {
    return res.status(403).json({
      success: false,
      message: "Unauthorized Access.",
    });
    // console.log("can not access admin features");
  } else {
    next();
  }
};
module.exports = { protectingRoutes, isAdmin };
