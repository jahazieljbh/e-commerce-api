import mongoose from "mongoose";
import validator from "validator";
import crypto from "crypto";
import bcrypt from "bcryptjs";

import path from "path";
import fs from "fs/promises";
import { dirname, extname, join } from "path";
import { fileURLToPath } from "url";

import User from "../models/User.js";
import Address from "../models/Address.js";
import Cart from "../models/Cart.js";
import { sendEmail } from "./email.controller.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Controlador para crear un nuevo usuario
export const createUser = async (req, res) => {
  try {
    const { firstname, lastname, mobile, email, password, role, avatar } =
      req.body;

    if (!firstname) {
      return res.status(400).json({ message: "El nombre es obligatorio" });
    }

    if (!lastname) {
      return res.status(400).json({ message: "El apellido es obligatorio" });
    }

    if (!validator.isMobilePhone(mobile, "es-MX")) {
      return res
        .status(400)
        .json({
          message: `${mobile} no es un número de teléfono válido en México`,
        });
    }

    if (!email) {
      return res.status(400).json({ message: "El email es obligatorio" });
    }

    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ error: "Por favor ingrese un correo electrónico válido." });
    }

    if (!password) {
      return res.status(400).json({ message: "La contraseña es obligatoria" });
    }

    if (password.length < 8) {
      return res.status(400).json({
        message: "La contraseña debe tener al menos 8 caracteres",
      });
    }

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    if (!validator.matches(password, passwordRegex)) {
      return res.status(400).json({
        message:
          "Por favor ingrese una contraseña con al menos 8 caracteres que contenga al menos un número, una letra mayúscula y una letra minúscula.",
      });
    }

    if (avatar) {
      const allowedExtensions = ["jpg", "jpeg", "png", "gif"];
      const fileExtension = avatar.split(".").pop().toLowerCase();

      if (!allowedExtensions.includes(fileExtension)) {
        return res.status(400).json({
          message: `${avatar} no es un formato de archivo de imagen válido. Los formatos permitidos son: jpg, jpeg, png y gif.`,
        });
      }
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: "Ya existe un usuario registrado con ese correo electrónico.",
      });
    }

    const userData = {
      firstname,
      lastname,
      mobile,
      email,
      password,
      role,
      avatar,
    };

    const user = await User.create(userData);

    return res
      .status(201)
      .json({
        success: true,
        message: "Usuario creado exitosamente",
        user: user,
      });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, error: "Error interno del servidor" });
  }
};

// Controlador para autenticar a un usuario
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ message: "El email es obligatorio" });
    }

    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ error: "Por favor ingrese un correo electrónico válido." });
    }

    if (!password) {
      return res.status(400).json({ message: "La contraseña es obligatoria" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ error: "La contraseña debe tener al menos 8 caracteres" });
    }

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    if (!validator.matches(password, passwordRegex)) {
      return res.status(400).json({
        message:
          "Por favor ingrese una contraseña con al menos 8 caracteres que contenga al menos un número, una letra mayúscula y una letra minúscula.",
      });
    }

    const user = await User.findByCredentials(email, password);

    const token = await user.generateAuthToken();

    return res
      .status(200)
      .json({
        success: true,
        message: "Inicio de sesion correcto",
        user: user,
        token: token,
      });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: err.message });
  }
};

// Controlador para cerrar sesión de un usuario
export const logoutUser = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });

    await req.user.save();

    return res
      .status(200)
      .json({ success: true, message: "Sesión cerrada correctamente" });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, error: "Error interno del servidor" });
  }
};

// Controlador para cerrar sesión de todos los dispositivos del usuario
export const logoutAllUsers = async (req, res) => {
  try {
    // Obtener el usuario autenticado a partir del token de autorización enviado en la solicitud
    const user = await User.findById(req.user._id);

    // Eliminar todos los tokens del usuario
    user.tokens = [];

    // Guardar los cambios en la base de datos
    await user.save();

    return res
      .status(200)
      .json({ success: true, message: "Sesiones cerradas correctamente" });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, error: "Error interno del servidor" });
  }
};

// Controlador para obtener información de un usuario
export const getUserById = async (req, res) => {
  const userId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "id no válido" });
  }

  if (!req.params || !userId) {
    return res.status(400).json({ message: "Parámetros no válidos" });
  }

  try {
    const user = await User.findById(userId)
      .populate("cart")
      .populate("addresses");

    if (!user) {
      return res.status(404).json({ message: "El usuario no existe" });
    }

    return res.status(200).json({ success: true, user: user });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, error: "Error interno del servidor" });
  }
};

// Controlador para obtener información de todos los usuarios
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate("cart").populate("addresses");

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No hay usuarios disponibles" });
    }

    return res
      .status(200)
      .json({ success: true, count: users.length, users: users });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, error: "Error interno del servidor" });
  }
};

// Controlador para actualizar la información de un usuario por ID
export const updateUser = async (req, res) => {
  const userId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "id no válido" });
  }

  try {
    const allowedUpdates = ["firstname", "lastname", "mobile", "email"];

    if (!Object.keys(req.body).length) {
      return res
        .status(400)
        .json({ error: "No se recibieron datos para actualizar." });
    }

    const updates = Object.keys(req.body);

    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
      return res
        .status(403)
        .json({ error: "Actualización no válida: campos no permitidos." });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "El usuario no existe." });
    }

    const userData = { ...req.body };

    const updateUser = await user.updateOne(userData);

    return res
      .status(200)
      .json({
        success: true,
        message: "Usuario actualizado exitosamente",
        user: updateUser,
      });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, error: "Error interno del servidor" });
  }
};

export const updatePassword = async (req, res) => {
  // Obtener el usuario a partir del token de autenticación
  const user = await User.findOne({ _id: req.user._id });

  // contraseña actual y contraseña nueva
  const { currentPassword, newPassword } = req.body;

  const isMatch = await bcrypt.compare(currentPassword, user.password);

  if (!isMatch) {
    return res
      .status(401)
      .json({ message: "La contraseña actual no coincide" });
  }

  user.password = newPassword;

  user.passwordChangedAt = Date.now();

  try {
    await user.save();

    return res
      .status(200)
      .json({ success: true, message: "Contraseña actualizada correctamente" });
  } catch (err) {
    return res
      .status(500)
      .json({
        success: false,
        message: "Error al intentar actualizar la contraseña",
      });
  }
};

// Controlador para generar un token de recuperación de contraseña
export const forgotPasswordToken = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ message: "El correo electronico es requerido" });
    }

    // Verificar que el correo electrónico exista en la base de datos
    const user = await User.findOne({ email });

    // Generar un token de restablecimiento de contraseña
    const resetToken = user.generatePasswordReset();

    console.log(resetToken);
    await user.save();

    // Enviar el token por correo electrónico al usuario
    const resetURL = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/users/resetPassword/${resetToken}`;

    const message = `¡Hola, ${user.firstname}! 

    ¿Olvidaste tu contraseña? Sigue el siguiente enlace para restablecerla. Este enlace es válido por 24 horas a partir de ahora: <a href="${resetURL}">Haga clic aquí</a>. 
    
    Si no solicitaste este cambio, por favor ignora este correo electrónico.`;

    try {
      const emailData = {
        to: user.email,
        subject: "Tu token de restablecimiento de contraseña",
        message,
      };

      await sendEmail(emailData);

      return res.status(200).json({
        success: true,
        message:
          "Se ha enviado un correo electrónico con el token de restablecimiento de contraseña.",
      });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, error: "Error interno del servidor" });
  }
};

// Controlador para restablecer la contraseña de un usuario.
export const resetPassword = async (req, res) => {
  try {
    const { password } = req.body;
    const { token } = req.params;

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    console.log(hashedToken);
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        message:
          "El token de restablecimiento de contraseña no es válido o ha expirado.",
      });
    }

    user.password = password;

    user.passwordChangedAt = Date.now();

    user.passwordResetToken = undefined;

    user.passwordResetExpires = undefined;

    await user.save();

    const message = `¡Hola, ${user.firstname}! Su contraseña ha sido cambiada exitosamente`;

    try {
      const emailData = {
        to: user.email,
        subject: "Su contraseña ha sido cambiada exitosamente",
        message,
      };

      await sendEmail(emailData);

      return res
        .status(200)
        .json({
          success: true,
          message: "Su contraseña se ha actualizado correctamente",
        });
    } catch (err) {
      return res
        .status(500)
        .json({
          success: false,
          message: "Hubo un error al intentar enviar el correo electrónico",
        });
    }
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, error: "Error interno del servidor" });
  }
};

// Controlador para eliminar un usuario por ID
export const deleteUserById = async (req, res) => {
  const userId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "id no válido" });
  }

  if (!req.params || !userId) {
    return res.status(400).json({ message: "Parámetros no válidos" });
  }

  try {
    const userExists = await User.findById(userId);

    if (!userExists) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    await Address.deleteMany({ user: userId });

    await Cart.deleteMany({ user: userId });

    await userExists.deleteOne({ _id: userId });

    return res
      .status(200)
      .json({ success: true, message: "Usuario eliminado exitosamente" });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, error: "Error interno del servidor" });
  }
};

// Controlador para subir el avatar de un usuario
export const uploadAvatar = async (req, res) => {
  try {
    const user = req.user._id;
    const avatarFile = req.file;

    if (!avatarFile) {
      return res
        .status(400)
        .json({ message: "No se ha enviado ningún archivo" });
    }

    const allowedExtensions = ["jpg", "jpeg", "png", "gif"];
    const fileExtension = avatarFile.name.split(".").pop().toLowerCase();

    if (!allowedExtensions.includes(fileExtension)) {
      return res
        .status(400)
        .json({
          message: `${avatarFile} no es un formato de archivo de imagen válido. Los formatos permitidos son: jpg, jpeg, png y gif.`,
        });
    }

    const avatarPath = path.join(
      __dirname,
      "..",
      "public",
      "uploads",
      `${user}.${fileExtension}`
    );

    await fs.writeFile(avatarPath, avatarFile);

    const userData = {
      avatar: avatarPath,
    };

    const uploadAvatar = await User.findByIdAndUpdate(user, userData);

    return res
      .status(200)
      .json({
        success: true,
        message: "Imagen de perfil subido exitosamente",
        user: uploadAvatar,
      });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, error: "Error interno del servidor" });
  }
};

// Controlador para obtener el avatar de un usuario
export const getAvatarById = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);
    if (!user || !user.avatar) {
      return res.status(404).json({ message: "Recurso no encontrado" });
    }

    const imagePath = path.join(__dirname, `../public/uploads/${user._id}.jpg`);
    await fs.writeFile(imagePath, user.avatar);
    res.set("Content-Type", "image/jpg");
    res.sendFile(imagePath);

    return res.status(200).json({ success: true, imagen: imagePath });
  } catch (err) {
    console.error(err);
    res.status(404).json({ message: "Error interno del servidor" });
  }
};

// Esta función bloquea un usuario a partir de su ID
export const blockUserById = async (req, res) => {
  const userId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "id no válido" });
  }

  if (!req.params || !userId) {
    return res.status(400).json({ message: "Parámetros no válidos" });
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (user.isBlocked) {
      return res.status(400).json({ message: "El usuario ya está bloqueado" });
    }

    if (user._id === req.user._id && req.user.role === "admin") {
      return res
        .status(403)
        .json({ message: "No puedes bloquear tu propia cuenta" });
    }

    await user.updateOne({ _id: userId }, { isBlocked: true });

    return res
      .status(200)
      .json({ success: true, message: "Usuario bloqueado con exitosamente" });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, error: "Error interno del servidor" });
  }
};

// Esta función desbloquea un usuario a partir de su ID
export const unblockUserById = async (req, res) => {
  const userId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "id no válido" });
  }

  if (!req.params || !userId) {
    return res.status(400).json({ message: "Parámetros no válidos" });
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    await user.updateOne({ _id: userId }, { $set: { isBlocked: false } });

    return res
      .status(200)
      .json({
        success: true,
        message: "Usuario desbloqueado con exitosamente",
      });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, error: "Error interno del servidor" });
  }
};
