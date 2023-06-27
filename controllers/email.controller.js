import nodemailer from "nodemailer";

import {
  EMAIL_USER,
  EMAIL_PASSWORD
} from "../config/config.js";


const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: true,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false
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
