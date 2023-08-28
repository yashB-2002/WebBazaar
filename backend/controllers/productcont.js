const slugify = require("slugify");
const fs = require("fs");
const Product = require("../models/productModel");
const addProductController = async (req, res) => {
  try {
    const { name, price, slug, description, category, quantity, status } =
      req.fields;
    const { photo } = req.files;
    if (
      !name &&
      !price &&
      !slug &&
      !description &&
      !category &&
      !quantity &&
      !status &&
      !photo
    ) {
      return res.status(422).json({
        message: "All fields are mandatory.",
      });
    }
    const product = new Product({ ...req.fields, slug: slugify(name) });
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();
    return res.status(201).json({
      success: true,
      message: "Category created successfully.",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error,
      message: "error in creating products",
    });
  }
};

const changeProductController = async (req, res) => {
  try {
    const { name, price, slug, description, category, quantity, status } =
      req.fields;
    const { photo } = req.files;
    if (
      !name &&
      !price &&
      !slug &&
      !description &&
      !category &&
      !quantity &&
      !status &&
      !photo
    ) {
      return res.status(422).json({
        message: "All fields are mandatory.",
      });
    }
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        ...req.fields,
        slug: slugify(name),
      },
      { new: true }
    );
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();
    return res.status(201).json({
      success: true,
      message: "Product updated successfully.",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error,
      message: "error in updating products",
    });
  }
};

const getProductController = async (req, res) => {
  try {
    const products = await Product.find({})
      .select("-photo")
      .populate("category")
      .sort({ createdAt: -1 });
    return res.status(201).json({
      success: true,
      message: "Fetched products successfully.",
      resultCount: products.length,
      products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error,
      message: "error in fetching products",
    });
  }
};

const getSingleProductController = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.id }).select(
      " -createdAt -updatedAt "
    );
    // .populate("category");
    return res.status(201).json({
      success: true,
      message: "Fetched product successfully.",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error,
      message: "error in fetching product",
    });
  }
};

const getSingleProductPhotoController = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).select("photo");
    if (product.photo.data) {
      res.set("Content-Type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error,
      message: "error in fetching product",
    });
  }
};
const deleteProductController = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(201).json({
      success: true,
      message: " product deleted successfully. ",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error,
      message: "error in fetching product",
    });
  }
};
const filterProductController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await Product.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Filtering Products",
      error,
    });
  }
};

const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const results = await Product.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    }).select("-photo");
    res.json(results);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error In Search Product API",
      error,
    });
  }
};
const relatedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await Product.find({
      category: cid,
      _id: { $ne: pid },
    })
      .select("-photo")
      .limit(3)
      .populate("category");
    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "error while geting related product",
      error,
    });
  }
};
module.exports = {
  addProductController,
  getProductController,
  getSingleProductController,
  getSingleProductPhotoController,
  deleteProductController,
  changeProductController,
  filterProductController,
  searchProductController,
  relatedProductController,
};
