const asyncHandler = require("express-async-handler");
const GoalModel = require("../models/goals.model");

// @desc    GET Goals
// @route   GET /api/goals
// @access  Private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await GoalModel.find();
  res.status(200).json(goals);
});

const addGoals = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text");
  }
  const goal = await GoalModel.create({
    text: req.body.text,
  });
  res.status(200).json(goal);
});

const updateGoals = asyncHandler(async (req, res) => {
  const goal = await GoalModel.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Goal Not Found");
  }
  const updatedGoal = await GoalModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updatedGoal);
});

const deleteGoals = asyncHandler(async (req, res) => {
  const goal = await GoalModel.findById(req.params.id);
  if (!goal) {
    res.status(404);
    throw new Error("Goal Not Found");
  }
  await goal.deleteOne();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getGoals,
  addGoals,
  updateGoals,
  deleteGoals,
};
