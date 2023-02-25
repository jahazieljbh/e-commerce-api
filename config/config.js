import { config } from "dotenv";

config();

export const PORT = process.env.PORT || 3000;
export const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/e-commerce-db";
export const JWT_SECRET = process.env.JWT_SECRET || "default_secret_key";