const {
  signController,
  loginController,
  forgotPasswordController,
} = require("../controllers/authcont");
const { protectingRoutes, isAdmin } = require("../middlewares/authMiddle");

const router = require("express").Router();
router.post("/signup", signController);
router.post("/login", loginController);
router.get("/authenticate", protectingRoutes, (_, res) => {
  res.status(200).json({ success: true });
});
router.post("/changepassword", forgotPasswordController);
router.get("/adminauthenticate", protectingRoutes, isAdmin, (_, res) => {
  res.status(200).json({ success: true });
});
module.exports = router;
