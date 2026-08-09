import api from "../api/axios.js";

export const sendMessage = (data) => {
  return api.post("/messages/send-message", data);
};
