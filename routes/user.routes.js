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
  addToCart,
  removeFromCart,
  clearCart,
  addAddress,
  removeAddress,
  updateAddress,
  addFavoriteProduct,
  removeFavoriteProduct,
  getFavoriteProducts,
} from "../controllers/user.controller.js";
import { auth, isAdmin } from "../utils/auth.js";
import upload from "../utils/upload.js";

// Crear el router
const router = Router();

// Ruta para crear un nuevo usuario.
router.post("/register", createUser);

// Ruta para autenticar a un usuario.
router.post("/login", loginUser);

// Ruta para cerrar sesión de un usuario.
router.post("/me/logout", auth, logoutUser);

// Ruta para cerrar sesión de todos los dispositivos del usuario.
router.post("/me/logoutAll", auth, logoutAllUsers);

// Ruta para obtener información de un usuario.
router.get("/me/:id", auth, getUserById);

// Ruta para obtener información de todos los usuarios.
router.get("/me/", auth, isAdmin, getAllUsers);

// Ruta para actualizar información de un usuario.
router.patch("/me/:id", auth, updateUserById);

// Ruta para eliminar un usuario.
router.delete("/me/:id", auth, isAdmin, deleteUserById);

// Ruta para subir el avatar de un usuario.
router.post("/me/avatar", auth, upload.single("avatar"), uploadAvatar);

// Ruta para obtener el avatar de un usuario.
router.get("/me/:id/avatar", auth, getAvatarById);

// Ruta para para bloquear a un usuario.
router.patch("/me/:id/block", auth, isAdmin, blockUserById);

// Ruta para para desbloquear a un usuario.
router.patch("/me/:id/unblock", auth, isAdmin, unblockUserById);

// Ruta para agregar un producto al carrito de un usuario.
router.post("/me/cart", auth, addToCart);

// Ruta para eliminar un producto del carrito de un usuario.
router.delete("/me/cart", auth, removeFromCart);

// Ruta para vaciar el carrito de un usuario.
router.delete("/me/cart/clear", auth, clearCart);

// Ruta para agregar una dirección de envío a la cuenta de un usuario.
router.post("/me/addresses", auth, addAddress);

// Ruta para eliminar una dirección de envío de la cuenta de un usuario.
router.delete("/me/addresses", auth, removeAddress);

// Ruta para actualizar la información de una dirección de envío de la cuenta de un usuario.
router.patch("/me/addresses", auth, updateAddress);

// Ruta para agregar un producto a la lista de favoritos de un usuario.
router.post("/me/favorites-products", auth, addFavoriteProduct);

// Ruta para eliminar un producto de la lista de favoritos de un usuario.
router.delete("/me/favorites-products", auth, removeFavoriteProduct);

// Ruta para obtener una lista de los productos favoritos de un usuario.
router.get("/me/favorites-products", auth, getFavoriteProducts);

export default router;
