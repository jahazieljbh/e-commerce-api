import nodemailer from "nodemailer";
import { google } from "googleapis";

const OAuth2 = google.auth.OAuth2;
import {
  EMAIL_USER,
  CLIENT_ID,
  CLIENT_SECRET,
  REFRESH_TOKEN,
} from "../config/config.js";

const oauth2Client = new OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);
oauth2Client.setCredentials({
  refresh_token: REFRESH_TOKEN,
  tls: {
    rejectUnauthorized: false
  }
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: EMAIL_USER,
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    refreshToken: REFRESH_TOKEN,
    accessToken: oauth2Client.getAccessToken()
  }
});

export const sendEmail = async (emailData) => {
  const mailOptions = {
    from: EMAIL_USER,
    to: emailData.to,
    subject: emailData.subject,
    html: emailData.message
  };

  try {
    // Enviar el correo electrónico y manejar las respuestas
    const info = await transporter.sendMail(mailOptions);
    console.log("Correo electrónico enviado:", info);
  } catch (error) {
    console.error("Error al enviar el correo electrónico:", error);
  }
};
