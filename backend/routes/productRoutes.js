const {
  addProductController,
  getProductController,
  getSingleProductController,
  getSingleProductPhotoController,
  deleteProductController,
  changeProductController,
  filterProductController,
  searchProductController,
  relatedProductController,
} = require("../controllers/productcont");
const { protectingRoutes, isAdmin } = require("../middlewares/authMiddle");
const formidableMiddleware = require("express-formidable");
const router = require("express").Router();
router.post(
  "/add-product",
  protectingRoutes,
  isAdmin,
  formidableMiddleware(),
  addProductController
);
router.get("/get-product", getProductController);
router.get("/get-product/:id", getSingleProductController);
router.get("/get-product-photo/:id", getSingleProductPhotoController);
router.delete("/delete-product/:id", deleteProductController);
router.put(
  "/change-product/:id",
  formidableMiddleware(),
  changeProductController
);
router.post("/product-filter", filterProductController);
router.get("/search-product/:keyword", searchProductController);
router.get("/related-product/:pid/:cid", relatedProductController);

module.exports = router;
