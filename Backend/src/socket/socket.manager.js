const clients = new Map();

export const addClient = (userId, ws) => {
  const key = userId.toString();

  clients.set(key, ws);

  console.log("===== ADD CLIENT =====");
  console.log("User connected:", key);
  console.log("Map keys:", [...clients.keys()]);
  console.log("Online users:", clients.size);
};
export const removeClient = (userId) => {
  clients.delete(userId.toString());

  console.log("User disconnected:", userId);
  console.log("Online users:", clients.size);
};

export const getClient = (userId) => {
  const key = userId.toString();

  console.log("===== GET CLIENT =====");
  console.log("Looking for user:", key);
  console.log("Map keys:", [...clients.keys()]);
  console.log("Map has user:", clients.has(key));

  return clients.get(key);
};

export const isUserOnline = (userId) => {
  return clients.has(userId.toString());
};
