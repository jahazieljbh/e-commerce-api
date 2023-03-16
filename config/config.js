import { config } from "dotenv";

config();

// Aplicacion
const PORT = process.env.PORT
// Base de datos
const MONGODB_URI = process.env.MONGODB_URI
// JWT
const JWT_SECRET = process.env.JWT_SECRET
// EMAIL API
const EMAIL_USER = process.env.EMAIL_USER
const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REFRESH_TOKEN = process.env.REFRESH_TOKEN
//PAYPAL API
const PAYPAL_API_CLIENT = process.env.PAYPAL_API_CLIENT
const PAYPAL_API_SECRET = process.env.PAYPAL_API_SECRET
const PAYPAL_API_SANDBOX = `https://api-m.sandbox.paypal.com`;
const PAYPAL_API_PRODUCTION = `https://api-m.paypal.com`;

export { PORT, MONGODB_URI, JWT_SECRET, EMAIL_USER, CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN, PAYPAL_API_CLIENT, PAYPAL_API_SECRET, PAYPAL_API_SANDBOX, PAYPAL_API_PRODUCTION };