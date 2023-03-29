const express = require("express");
const {
  registerUser,
  loginUser,
  getCurrentUserProfile,
} = require("../controller/user.controller");
const { protect } = require("../middleware/auth.middleware");
const router = express.Router();

router.post("/", registerUser);
router.post("/login", loginUser);
router.post("/me", protect, getCurrentUserProfile);

module.exports = router;
