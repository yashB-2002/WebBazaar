const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../utils/authHelper");

const signController = async (req, res) => {
  try {
    const { name, email, password, phone, address, forgotPasswordKey } =
      req.body;
    if (
      !name &&
      !email &&
      !password &&
      !phone &&
      !address &&
      !forgotPasswordKey
    ) {
      return res.status(422).json({
        message: "All fields are mandatory.",
      });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: "User Already Exist.",
      });
    }
    const hashedPassword = await hashPassword(password);
    const newUser = await new User({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      forgotPasswordKey,
    }).save();
    return res.status(201).json({
      success: true,
      message: "User created successfully.",
      newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error,
      message: "Registeration is unsuccessfull.",
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email && !password) {
      return res.status(422).json({
        error: "All fields are mandatory.",
      });
    }
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({
        error: "User Not Found.",
      });
    }
    const matchPassword = await comparePassword(
      password,
      existingUser.password
    );
    if (!matchPassword) {
      return res.status(401).json({
        error: "Incorrect Password.",
      });
    }
    const token = jwt.sign({ _id: existingUser._id }, process.env.JWT_SECRET, {
      expiresIn: "5d",
    });
    return res.status(200).json({
      success: true,
      message: "Logged in successfully.",
      user: {
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error,
      message: "Login to your account is unsuccessfull.",
    });
  }
};

const forgotPasswordController = async (req, res) => {
  try {
    const { email, newpassword, forgotPasswordKey } = req.body;
    if (!email && !password && !forgotPasswordKey) {
      return res.status(422).json({
        error: "All fields are mandatory.",
      });
    }
    const existingUser = await User.findOne({ email, forgotPasswordKey });
    if (!existingUser) {
      return res.status(404).json({
        error: "User Not Found.",
      });
    }
    const hashedPassword = await hashPassword(newpassword);
    await User.findByIdAndUpdate(
      existingUser._id,
      {
        password: hashedPassword,
      },
      { new: true }
    );
    return res.status(201).json({
      success: true,
      message: "Password updated successfully.",
      newUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
      message: "Can not change password.",
    });
  }
};
module.exports = { signController, loginController, forgotPasswordController };
