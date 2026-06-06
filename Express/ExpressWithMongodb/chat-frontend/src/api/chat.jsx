import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080/chats",
  headers: {
    "Content-Type": "application/json",
  },
});

// Register Api Call

export const registerUser = async (userData) => {
  try {
    const response = await apiClient.post("/register", userData);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response?.data?.message || "Register Failed";
  }
};

// Login Api Call
export const login = async (userData) => {
  try {
    const response = await apiClient.post("/login", userData);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response?.data?.message || "Login Failed";
  }
};
