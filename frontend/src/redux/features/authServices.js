import axios from "axios";

const BASE_URL = "http://localhost:5000/api/users";

const registerUser = async (user) => {
  const response = await axios.post(BASE_URL, user);

  console.log(response);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const loginUser = async (user) => {
  const response = await axios.post(`${BASE_URL}/login`, user);

  console.log(response);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const logoutUser = () => {
  localStorage.removeItem("user");
};

const authService = {
  registerUser,
  loginUser,
  logoutUser,
};

export default authService;
