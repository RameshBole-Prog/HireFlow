import axios from "axios";

const API = "http://localhost:5000/api/auth";

// Register
export const registerUser = (data) => {
  return axios.post(`${API}/register`, data);
};

// Login
export const loginUser = (data) => {
  return axios.post(`${API}/login`, data);
};

// Get Profile (Protected)
export const getProfile = (token) => {
  return axios.get(`${API}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};