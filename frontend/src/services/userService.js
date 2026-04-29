import API from "./api";

export const getUsers = () => {
  return API.get("/users");
};

export const updateUser = (id, data) => {
  return API.put(`/users/${id}`, data);
};

export const deleteUser = (id) => {
  return API.delete(`/users/${id}`);
};