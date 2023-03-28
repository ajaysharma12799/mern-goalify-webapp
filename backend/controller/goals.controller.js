const asyncHandler = require("express-async-handler");

// @desc    GET Goals
// @route   GET /api/goals
// @access  Private
const getGoals = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get All Goals" });
});

const addGoals = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text");
  }
  res.status(200).json({ message: "Add New Goal" });
});

const deleteGoals = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Update Goal - ${req.params.id}` });
});

const updateGoals = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete Goal - ${req.params.id}` });
});

module.exports = {
  getGoals,
  addGoals,
  updateGoals,
  deleteGoals,
};
