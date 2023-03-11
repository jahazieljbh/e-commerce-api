import { Router } from "express";

import {
  createCart,
  deleteCartById,
  updateCartById,
  getCartById,
  getCarts,
  addProductToCart,
  removeProductFromCart,
  getProductFromCart,
  getAllProductsFromCart,
  updateQuantity,
  selectProduct,
} from "../controllers/cart.controller.js";

import { auth } from "../utils/auth.js";

const router = Router();

// Ruta para crear un nuevo carrito de compras
router.post("/", auth, createCart);

router.delete("/:id", auth, deleteCartById);

router.patch("/:id", auth, updateCartById);

router.get("/:id", auth, getCartById);

router.get("/", auth, getCarts);

router.post("/product/:id", auth, addProductToCart);

router.delete("/product/:id", auth, removeProductFromCart);

router.get("/product/:id", auth, getProductFromCart);

router.get("/product", auth, getAllProductsFromCart);

router.patch("/product/quantity/:id", auth, updateQuantity);

router.patch("/product/select/:id", auth, selectProduct);

export default router;
