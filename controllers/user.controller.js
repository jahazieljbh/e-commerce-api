import User from "../models/User.js";
import validator from "validator";
import { body, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import passport from "passport";
import path from "path";
import fs from "fs/promises";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

// Definir la clave secreta para el token
const secret = "clave_secreta_para_token";

// Controlador para crear un nuevo usuario
export const createUser = async (req, res) => {
  try {
    // Verificar si los campos requeridos están presentes en el cuerpo de la solicitud
    if (!req.body.email || !req.body.password) {
      return res
        .status(400)
        .send({ error: "El email y la contraseña son campos requeridos." });
    } // Validar el formato del email
    if (!validator.isEmail(req.body.email)) {
      return res
        .status(400)
        .send({ error: "Por favor, ingrese un correo electrónico válido." });
    }

    // Validar la fortaleza de la contraseña
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (!passwordRegex.test(req.body.password)) {
      return res.status(400).send({
        error:
          "La contraseña debe tener al menos 8 caracteres y contener al menos un número, una letra mayúscula y una letra minúscula.",
      });
    }

    // Verificar si el correo electrónico ya existe en la base de datos antes de crear un nuevo usuario
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).send({
        error: "Ya existe un usuario registrado con ese correo electrónico.",
      });
    }

    const user = new User(req.body);
    await user.save();
    const token = jwt.sign({ _id: user._id }, secret);
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Controlador para autenticar a un usuario
export const loginUser = async (req, res) => {
  try {
    // Verificar si los campos requeridos están presentes en el cuerpo de la solicitud
    if (!req.body.email || !req.body.password) {
      throw new Error(
        "Se requiere un correo electrónico y una contraseña válidos"
      );
    }

    // Validar el formato del email y la fortaleza de la contraseña
    const { email, password } = req.body;
    if (!validator.isEmail(email)) {
      throw new Error("El correo electrónico debe ser válido");
    }
    if (password.length < 8) {
      throw new Error("La contraseña debe tener al menos 8 caracteres");
    }

    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    // Manejar el caso en que el usuario no se haya registrado antes en el sistema
    if (
      error.message === "No se pudo encontrar un usuario con estas credenciales"
    ) {
      res
        .status(401)
        .send("No se pudo encontrar un usuario con estas credenciales");
    } else {
      res.status(400).send(error.message);
    }
  }
};

// Controlador para cerrar sesión de un usuario
export const logoutUser = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Controlador para cerrar sesión de todos los dispositivos del usuario
export const logoutAllUsers = async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send("Todas las sesiones han sido cerradas");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Controlador para obtener información de un usuario
export const getUserById = async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Controlador para actualizar la información de un usuario por ID
export const updateUserById = async (req, res) => {
  try {
    // Verificar si los campos requeridos están presentes en la solicitud
    const updates = Object.keys(req.body);
    const allowedUpdates = [
      "firstname",
      "lastname",
      "email",
      "mobile",
      "password",
    ];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );
    if (!isValidOperation) {
      return res
        .status(400)
        .send({ error: "Actualización no válida: campos no permitidos." });
    }

    // Validar el formato del id
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).send({ error: "ID no válido." });
    }

    // Verificar si el usuario está autenticado antes de ejecutar la acción
    const user = req.user;

    // Verificar si el usuario tiene permiso para realizar la acción
    if (req.user._id.toString() !== req.params.id) {
      return res
        .status(403)
        .send({ error: "No está autorizado para realizar esta acción." });
    }

    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Controlador para eliminar un usuario por ID
export const deleteUserById = async (req, res) => {
  try {
    // Validar el formato del id
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).send({ error: "ID no válido." });
    }

    // Verificar si el usuario está autenticado antes de ejecutar la acción
    const user = req.user;

    // Verificar si el usuario tiene permiso para realizar la acción
    if (req.user._id.toString() !== req.params.id) {
      return res
        .status(403)
        .send({ error: "No está autorizado para realizar esta acción." });
    }

    await user.remove();
    res.send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Controlador para subir el avatar de un usuario
export const uploadAvatar = async (req, res) => {
  try {
    const user = req.user;
    const avatarPath = path.join("public", "avatars", `${user._id}.jpg`);
    const buffer = req.file.buffer;

    // Guardar el archivo en el sistema de archivos
    await fs.writeFile(avatarPath, buffer);

    // Actualizar la referencia del avatar en el usuario
    user.avatar = avatarPath;
    await user.save();

    res.status(200).send();
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al subir el avatar");
  }
};

// Controlador para obtener el avatar de un usuario
export const getAvatarById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || !user.avatar) {
      throw new Error("Recurso no encontrado");
    }
    const imagePath = path.join(__dirname, `../uploads/${user._id}/avatar.jpg`);
    await fs.writeFile(imagePath, user.avatar);
    res.set("Content-Type", "image/jpg");
    res.sendFile(imagePath, () => {
      fs.unlink(imagePath); // Eliminar el archivo después de que se envíe la respuesta
    });
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
};
