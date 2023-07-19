import { config } from "dotenv";
 // Load environment variables from .env file
config();
 // Application
const PORT = process.env.PORT;
 // Database
const MONGODB_URI = process.env.MONGODB_URI;
 // JWT
const JWT_SECRET = process.env.JWT_SECRET;
 // Email API
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
 // PayPal API
const PAYPAL_API_CLIENT = process.env.PAYPAL_API_CLIENT;
const PAYPAL_API_SECRET = process.env.PAYPAL_API_SECRET;
const PAYPAL_API_SANDBOX = `https://api-m.sandbox.paypal.com`;
const PAYPAL_API_PRODUCTION = `https://api-m.paypal.com`;
export {
  PORT,
  MONGODB_URI,
  JWT_SECRET,
  EMAIL_USER,
  EMAIL_PASSWORD,
  PAYPAL_API_CLIENT,
  PAYPAL_API_SECRET,
  PAYPAL_API_SANDBOX,
  PAYPAL_API_PRODUCTION
};