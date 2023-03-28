const express = require("express");
const {
  getGoals,
  addGoals,
  updateGoals,
  deleteGoals,
} = require("../controller/goals.controller");

const router = express.Router();

router.route("/").get(getGoals).post(addGoals);

router.route("/:id").put(updateGoals).delete(deleteGoals);

module.exports = router;
