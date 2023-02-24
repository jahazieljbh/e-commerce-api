import { Router } from "express";

import {
  createUser,
  loginUser,
  logoutUser,
  logoutAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  uploadAvatar,
  getAvatarById,
} from "../controllers/user.controller.js";
import auth from "../utils/auth.js";
import upload from "../config/multerConfig.js";

// Crear el router
const router = Router();

// Ruta para crear un nuevo usuario
router.post("/users", createUser);

// Ruta para autenticar a un usuario
router.post("/users/login", loginUser);

// Ruta para cerrar sesión de un usuario
router.post("/users/logout", auth, logoutUser);

// Ruta para cerrar sesión de todos los dispositivos del usuario
router.post("/users/logoutAll", auth, logoutAllUsers);

// Ruta para obtener información de un usuario
router.get("/users/:id", getUserById);

// Ruta para actualizar información de un usuario
router.patch("/users/:id", auth, updateUserById);

// Ruta para eliminar un usuario
router.delete("/users/:id", auth, deleteUserById);

// Ruta para subir el avatar de un usuario
router.post("/users/me/avatar", auth, upload.single("avatar"), uploadAvatar);

// Ruta para obtener el avatar de un usuario
router.get("/users/:id/avatar", getAvatarById);

export default router;
