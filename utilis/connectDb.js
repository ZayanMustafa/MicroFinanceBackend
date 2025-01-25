import mongoose from "mongoose";

const connectToDB = () => {
  if (mongoose.connection.readyState == 1) {
    console.log("DB is already connected.");
    return;
  }

  try {
   mongoose.connect(process.env.MONGODB_URI);
    console.log("DB is successfully connected.");
  } catch (err) {
    console.log("Failed to connect DB", err);
  }
};


export default connectToDB;