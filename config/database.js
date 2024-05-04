import mongoose from "mongoose";

let connected = false;

export const connecteDB = async () => {
  //mongoose.set("strictQuery", true);
  //if isconnected, don't connect again
  if (connected) {
    console.log("MongoDB is already connected...");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL);
    connected = true;
    console.log("MongoDB connected...");
  } catch (error) {
    console.error(error);
  }
};
