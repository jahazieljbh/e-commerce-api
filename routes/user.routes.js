import { Router } from "express";

import {
  createUser,
  deleteUserById,
  updateUserById,
  getUserById,
  getAllUsers,
  uploadAvatar,
  getAvatarById,
  loginUser,
  logoutUser,
  logoutAllUsers,
  blockUserById,
  unblockUserById,
} from "../controllers/user.controller.js";
import { auth, isAdmin } from "../utils/auth.js";
import upload from "../utils/upload.js";

// Crear el router
const router = Router();

// Ruta para crear un nuevo usuario.
router.post("/signup", createUser);

// Ruta para autenticar a un usuario.
router.post("/login", loginUser);

// Ruta para cerrar sesión de un usuario.
router.post("/logout", auth, logoutUser);

// Ruta para cerrar sesión de todos los dispositivos del usuario.
router.post("/logoutAll", auth, logoutAllUsers);

// Ruta para obtener información de todos los usuarios.
router.get("/", auth, isAdmin, getAllUsers);

// Ruta para obtener información de un usuario.
router.get("/:id", auth, isAdmin, getUserById);

// Ruta para actualizar información de un usuario.
router.patch("/:id", auth, updateUserById);

// Ruta para eliminar un usuario.
router.delete("/:id", auth, isAdmin, deleteUserById);

// Ruta para subir el avatar de un usuario.
router.post("/avatar", auth, upload.single("avatar"), uploadAvatar);

// Ruta para obtener el avatar de un usuario.
router.get("/avatar/:id", auth, getAvatarById);

// Ruta para para bloquear a un usuario.
router.patch("/:id/block", auth, isAdmin, blockUserById);

// Ruta para para desbloquear a un usuario.
router.patch("/:id/unblock", auth, isAdmin, unblockUserById);

export default router;
