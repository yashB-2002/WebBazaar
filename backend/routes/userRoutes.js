const getUserController = require("../controllers/user");

const router = require("express").Router();
router.get("/getUser", getUserController);
module.exports = router;
