import { Router } from "express";

import {
  createUser,
  loginUser,
  logoutUser,
  logoutAllUsers,
  getUserById,
  getUsers,
  updateUserById,
  deleteUserById,
  uploadAvatar,
  getAvatarById,
} from "../controllers/user.controller.js";
import auth from "../utils/auth.js";
import upload from "../utils/upload.js";

// Crear el router
const router = Router();

// Ruta para crear un nuevo usuario
router.post("/user/register", createUser);

// Ruta para autenticar a un usuario
router.post("/user/login", loginUser);

// Ruta para cerrar sesión de un usuario
router.post("/user/logout", auth, logoutUser);

// Ruta para cerrar sesión de todos los dispositivos del usuario
router.post("/user/logoutAll", auth, logoutAllUsers);

// Ruta para obtener información de un usuario
router.get("/user/:id", getUserById);

// Ruta para obtener información de todos los usuarios
router.get("/users", getUsers);

// Ruta para actualizar información de un usuario
router.patch("/user/:id", auth, updateUserById);

// Ruta para eliminar un usuario
router.delete("/user/:id", auth, deleteUserById);

// Ruta para subir el avatar de un usuario
router.post("/user/me/avatar", auth, upload.single("avatar"), uploadAvatar);

// Ruta para obtener el avatar de un usuario
router.get("/user/:id/avatar", getAvatarById);

export default router;
