import mongoose from "mongoose";
import validator from "validator";
import { body, validationResult } from "express-validator";
import path from "path";
import fs from "fs/promises";
import { dirname, extname, join } from "path";
import { fileURLToPath } from "url";

import User from "../models/User.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Controlador para crear un nuevo usuario
export const createUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;

    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ error: "Por favor ingrese un correo electrónico válido." });
    }

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    if (!validator.matches(password, passwordRegex)) {
      return res.status(400).json({
        error:
          "Por favor ingrese una contraseña con al menos 8 caracteres que contenga al menos un número, una letra mayúscula y una letra minúscula.",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        error: "Ya existe un usuario registrado con ese correo electrónico.",
      });
    }

    const userData = { ...req.body };

    const user = await User.create(userData);

    return res.status(201).json({ user });
  } catch (err) {
    return res.status(500).json({ error: "Hubo un error al crear el usuario" });
  }
};

// Controlador para autenticar a un usuario
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: "Se requiere un correo electrónico y una contraseña válidos",
    });
  }

  if (!validator.isEmail(email)) {
    return res
      .status(400)
      .json({ error: "El correo electrónico debe ser válido" });
  }

  if (password.length < 8) {
    return res
      .status(400)
      .json({ error: "La contraseña debe tener al menos 8 caracteres" });
  }

  try {
    const user = await User.findByCredentials(email, password);

    if (!user) {
      return res.status(401).json({
        error: "No se pudo encontrar un usuario con estas credenciales",
      });
    }

    const token = await user.generateAuthToken();

    return res.status(200).json({ user, token });
  } catch (err) {
    console.error(err);

    return res.status(500).json({ error: "Hubo un error al iniciar sesión" });
  }
};

// Controlador para cerrar sesión de un usuario
export const logoutUser = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );

    await req.user.save();

    return res.status(200).json({ message: "Sesión cerrada correctamente" });
  } catch (err) {
    console.error(err);

    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Controlador para cerrar sesión de todos los dispositivos del usuario
export const logoutAllUsers = async (req, res) => {
  try {
    req.user.tokens = [];

    await req.user.save();

    return res.status(200).json({ message: "Sesiones cerradas correctamente" });
  } catch (err) {
    console.error(err);

    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Controlador para obtener información de un usuario
export const getUserById = async (req, res) => {
  try {
    const _id = mongoose.Types.ObjectId(req.params.id);
    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).json({ message: "El usuario no existe" });
    }

    return res.status(200).json({ user });
  } catch (err) {
    if (err instanceof mongoose.CastError) {
      return res.status(400).json({ message: "ID de usuario inválido" });
    }

    console.error(err);

    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Controlador para obtener información de todos los usuarios
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort("-_id");

    if (!users.length) {
      return res.status(404).json({ message: "No hay usuarios disponibles" });
    }

    return res.status(200).json({ users });
  } catch (err) {
    console.error(err);

    return res
      .status(500)
      .json({ error: "Ha ocurrido un error al obtener los usuarios" });
  }
};

// Controlador para actualizar la información de un usuario por ID
export const updateUserById = async (req, res) => {
  try {
    const allowedUpdates = ["firstname", "lastname", "email", "mobile"];
    const updates = Object.keys(req.body);
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
      return res
        .status(400)
        .json({ error: "Actualización no válida: campos no permitidos." });
    }

    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({ error: "El usuario no existe." });
    }

    return res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: "Ha ocurrido un error al actualizar el usuario" });
  }
};

// Controlador para eliminar un usuario por ID
export const deleteUserById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "ID no válido." });
    }

    const user = await User.findById(req.params.id);

    await user.deleteOne();
    return res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: "Ha ocurrido un error al eliminar el usuario" });
  }
};

// Controlador para subir el avatar de un usuario
export const uploadAvatar = async (req, res) => {
  try {
    const user = req.user;
    if (!req.file) {
      return res.status(400).json("No se ha enviado ningún archivo");
    }
    const avatarPath = path.join(
      __dirname,
      "..",
      "public",
      "uploads",
      `${user._id}.jpg`
    );

    // Guardar el archivo en el sistema de archivos
    await fs.writeFile(avatarPath, req.file.buffer);

    // Actualizar la referencia del avatar en el usuario y guardarlo en la base de datos
    user.avatar = `/uploads/${user._id}.jpg`;
    await user.save();

    res.status(200).json({ message: "Avatar subido exitosamente" });
  } catch (err) {
    console.error(err);
    res.status(500).json("Error al subir el avatar");
  }
};

// Controlador para obtener el avatar de un usuario
export const getAvatarById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || !user.avatar) {
      throw new Error("Recurso no encontrado");
    }
    const imagePath = path.join(__dirname, `../public/uploads/${user._id}.jpg`);
    await fs.writeFile(imagePath, user.avatar);
    res.set("Content-Type", "image/jpg");
    res.sendFile(imagePath);
  } catch (err) {
    console.error(err);
    res.status(404).json({ error: error.message });
  }
};

// Esta función bloquea un usuario a partir de su ID
export const blockUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (user.isBlocked) {
      return res.status(400).json({ message: "El usuario ya está bloqueado" });
    }

    if (user._id === req.user._id && req.user.role === 'admin') { 
      return res.status(403).json({ message: 'No puedes bloquear tu propia cuenta' }); 
    }

    await User.updateOne({ _id: userId }, { isBlocked: true });

    return res
      .status(200)
      .json({ status: "success", message: "Usuario bloqueado con éxito" });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ status: "error", message: "Error Interno del Servidor" });
  }
};

// Esta función desbloquea un usuario a partir de su ID
export const unblockUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    await User.updateOne({ _id: userId }, { $set: { isBlocked: false } });

    return res.status(200).json({ message: "Usuario desbloqueado con éxito" });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: error.message });
  }
};
