import API from "./api";

// Register
export const registerUser = (data) => {
  return API.post("/auth/register", data);
};

// Login
export const loginUser = (data) => {
  return API.post("/auth/login", data);
};

// Profile (no token needed now)
export const getProfile = () => {
  return API.get("/auth/profile");
};