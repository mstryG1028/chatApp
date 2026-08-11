const clients = new Map();

export const addClient = (userId, ws) => {
  const key = userId.toString();

  clients.set(key, ws);
};
export const removeClient = (userId) => {
  clients.delete(userId.toString());
};

export const getClient = (userId) => {
  const key = userId.toString();

  return clients.get(key);
};

export const isUserOnline = (userId) => {
  return clients.has(userId.toString());
};
