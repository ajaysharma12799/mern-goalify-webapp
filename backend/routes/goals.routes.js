const express = require("express");
const {
  getGoals,
  addGoals,
  updateGoals,
  deleteGoals,
} = require("../controller/goals.controller");
const { protect } = require("../middleware/auth.middleware");

const router = express.Router();

router.route("/").get(protect, getGoals).post(protect, addGoals);

router.route("/:id").put(protect, updateGoals).delete(protect, deleteGoals);

module.exports = router;
