import api from "../api/axios.js";

export const getAllConversation = () => {
  return api.get("/conversations");
};

export const getConversation = (id) => {
  return api.get(`/conversations/${id}`);
};
