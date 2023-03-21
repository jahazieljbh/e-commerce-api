import { Router } from "express";

import {
  createCart,
  deleteCartById,
  updateCartById,
  getCartById,
  getAllCarts,
  addProductToCart,
  removeProductFromCart,
  getProductFromCart,
  getAllProductsFromCart,
  updateQuantity,
  selectProduct,
} from "../controllers/cart.controller.js";

import { auth } from "../middlewares/auth.js";

const router = Router();

// Ruta para crear un nuevo carrito de compras.
router.post("/", auth, createCart);

// Ruta para borra un carrito por su ID.
router.delete("/:id", auth, deleteCartById);

// Ruta para actualiza un carrito por su ID
router.patch("/:id", auth, updateCartById);

// Ruta para obtener un carrito por su ID.
router.get("/:id", auth, getCartById);

// Ruta para obtener todos los carritos
router.get("/", auth, getAllCarts);

// Ruta para agrega un producto al carrito
router.post("/product/:id", auth, addProductToCart);

// Ruta para quitar un producto del carrito.
router.delete("/product/:id", auth, removeProductFromCart);

// Ruta para obtener un producto desde el carrito.
router.get("/product/:id", auth, getProductFromCart);

// Ruta para obtener todos los productos del carrito.
router.get("/products", auth, getAllProductsFromCart);

// Ruta para actualizar la cantidad de un producto en el carrito.
router.patch("/product/quantity/:id", auth, updateQuantity);

// Ruta para selecciona un producto en el carrito
router.patch("/product/select/:id", auth, selectProduct);

export default router;
