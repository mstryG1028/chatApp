import mongoose from "mongoose";

const initDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("db connected");
  } catch (err) {
    console.log("connection failed", err);
  }
};

export default initDB;
