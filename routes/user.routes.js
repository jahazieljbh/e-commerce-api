import { Router } from "express";

import {
  createUser,
  deleteUserById,
  updateUser,
  getUserById,
  getAllUsers,
  uploadAvatar,
  getAvatarById,
  loginUser,
  logoutUser,
  logoutAllUsers,
  blockUserById,
  unblockUserById,
  updatePassword,
  forgotPasswordToken,
  resetPassword
} from "../controllers/user.controller.js";
import { auth, isAdmin } from "../middlewares/auth.js";
import upload from "../middlewares/upload.js";

// Crear el router
const router = Router();

// Ruta para crear un nuevo usuario.
router.post("/signup", createUser);

// Ruta para autenticar a un usuario.
router.post("/login", loginUser);

// Ruta para cerrar sesión de un usuario.
router.post("/logout", auth, logoutUser);

// Ruta para cerrar sesión de todos los dispositivos del usuario.
router.post("/logout-all", auth, logoutAllUsers);

// Ruta para obtener información de todos los usuarios.
router.get("/all-users", auth, isAdmin, getAllUsers);

// Ruta para obtener información de un usuario.
router.get("/:id", auth, isAdmin, getUserById);

// Ruta para actualizar información de un usuario.
router.patch("/edit-user", auth, updateUser);

// Ruta para actualizar password de un usuario.
router.patch("/password", auth, updatePassword);

// Ruta para generar un token de recuperación de contraseña.
router.post("/forgot-password-token", forgotPasswordToken);

// Ruta para restablecer la contraseña de un usuario.
router.patch("/reset-password/:token", resetPassword);

// Ruta para eliminar un usuario.
router.delete("/:id", auth, isAdmin, deleteUserById);

// Ruta para subir el avatar de un usuario.
router.post("/avatar", auth, upload.single("avatar"), uploadAvatar);

// Ruta para obtener el avatar de un usuario.
router.get("/avatar/:id", auth, getAvatarById);

// Ruta para para bloquear a un usuario.
router.patch("/block/:id", auth, isAdmin, blockUserById);

// Ruta para para desbloquear a un usuario.
router.patch("/unblock/:id", auth, isAdmin, unblockUserById);

export default router;
