import axios from "axios";

const BASE_URL = "http://localhost:5000/api/goals";

// Create New Goal
const createGoal = async (goal, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(BASE_URL, goal, config);
  console.log(response);
  return response.data;
};

// Get All Goals
const getGoals = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(BASE_URL, config);
  console.log(response);
  return response.data;
};

// Delete Goal
const deleteGoal = async (goalID, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(`${BASE_URL}/${goalID}`, config);
  console.log(response);
  return response.data;
};

const goalService = {
  createGoal,
  getGoals,
  deleteGoal,
};

export default goalService;
