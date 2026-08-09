import api from "../api/axios.js";

export const login = (data) => {
  return api.post("/users/login", data);
};
export const register = (data) => {
  return api.post("/users/register", data);
};

export const getCurrentUser = () => {
  return api.get("/users/me");
};

export const getUserDetails = (id) => {
  return api.get(`/users/${id}`);
};

export const logout = (data) => {
  return api.post("/users/logout");
};
export const addfriend = (id) => {
  return api.post(`/users/${id}/add-friend`);
};
export const getAllFriends = (id) => {
  return api.get(`/users/all-friends`);
};

export const searchUsers = (query) => {
  return api.get("/users/search", {
    params: {
      query,
    },
  });
};
