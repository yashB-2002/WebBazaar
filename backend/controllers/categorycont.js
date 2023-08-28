const Category = require("../models/categoryModel");
const slugify = require("slugify");
const addCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(422).json({
        message: "All fields are mandatory.",
      });
    }
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({
        success: false,
        error: "Category Already Exist.",
      });
    }
    const category = await new Category({ name, slug: slugify(name) }).save();
    return res.status(201).json({
      success: true,
      message: "Category created successfully.",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error,
      message: "not created",
    });
  }
};

const changeCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await Category.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    return res.status(201).json({
      success: true,
      message: "Category updated successfully.",
      category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
      message: "not updated",
    });
  }
};

const getCategoryController = async (req, res) => {
  try {
    const categories = await Category.find({});
    return res.status(200).json({
      success: true,
      message: "Categories fetched successfully.",
      categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
      message: "can't get categories",
    });
  }
};

const getSingleCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findOne({ slug: id });
    return res.status(200).json({
      success: true,
      message: "Category fetched successfully.",
      category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
      message: "can't get category",
    });
  }
};

const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    await Category.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "Category deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
      message: "can't get category",
    });
  }
};
module.exports = {
  addCategoryController,
  changeCategoryController,
  getCategoryController,
  getSingleCategoryController,
  deleteCategoryController,
};
