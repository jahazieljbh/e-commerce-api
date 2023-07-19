import mongoose from "mongoose";
import { MONGODB_URI } from "./config.js";

export const connectDatabase = async () => {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(MONGODB_URI);
    console.log("Database is connected");
  } catch (error) {
    console.error(error);
  }  
};