const {
  addCategoryController,
  changeCategoryController,
  getCategoryController,
  getSingleCategoryController,
  deleteCategoryController,
} = require("../controllers/categorycont");
const { protectingRoutes, isAdmin } = require("../middlewares/authMiddle");

const router = require("express").Router();
router.post("/add-category", protectingRoutes, isAdmin, addCategoryController);
router.put(
  "/change-category/:id",
  protectingRoutes,
  isAdmin,
  changeCategoryController
);
router.get("/get-category", getCategoryController);

router.get("/get-category/:id", getSingleCategoryController);

router.delete("/delete-category/:id", deleteCategoryController);

module.exports = router;
