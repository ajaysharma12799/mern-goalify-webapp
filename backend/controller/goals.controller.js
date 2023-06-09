const asyncHandler = require("express-async-handler");
const GoalModel = require("../models/goals.model");

/**
 *
 * @desc    Get All Goals
 * @route   /api/goals/
 * @method  GET
 * @access  Private
 *
 */
const getGoals = asyncHandler(async (req, res) => {
  const goals = await GoalModel.find({ user: req.user.id });
  res.status(200).json(goals);
});

/**
 *
 * @desc    Add New Goal
 * @route   /api/goals/
 * @method  POST
 * @access  Private
 *
 */
const addGoals = asyncHandler(async (req, res) => {
  if (!req.body.text || !req.body.priority) {
    res.status(400);
    throw new Error("Please add all Fields");
  }
  const goal = await GoalModel.create({
    text: req.body.text,
    user: req.user.id,
    priority: req.body.priority,
  });
  res.status(200).json(goal);
});

/**
 *
 * @desc    Update Existing Goal
 * @route   /api/goals/
 * @method  PUT
 * @access  Private
 *
 */
const updateGoals = asyncHandler(async (req, res) => {
  const goal = await GoalModel.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Goal Not Found");
  }

  // Check If User Exist
  if (!req.user) {
    res.status(401);
    throw new Error("User Not Found");
  }

  // Make Sure the LoggedIn User Matched Goal User
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User Not Authorised");
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

/**
 *
 * @desc    Delete Existing Goal
 * @route   /api/goals/
 * @method  DELETE
 * @access  Private
 *
 */
const deleteGoals = asyncHandler(async (req, res) => {
  const goal = await GoalModel.findById(req.params.id);
  if (!goal) {
    res.status(404);
    throw new Error("Goal Not Found");
  }

  // Check If User Exist
  if (!req.user) {
    res.status(401);
    throw new Error("User Not Found");
  }

  // Make Sure the LoggedIn User Matched Goal User
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User Not Authorised");
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
