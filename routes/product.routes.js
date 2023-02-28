import { Router } from "express";

import { auth, isAdmin } from "../utils/auth.js";
import {
  createProduct,
  getProductById,
  getAllProducts,
  updateProductById,
  deleteProductById
} from "../controllers/product.controller.js";

// Crear el router
const router = Router();

// Ruta para agregar un producto
router.post("/", auth, createProduct);

// Ruta para obtener información de un producto
router.get("/:id", getProductById);

// Ruta para obtener información de todos los productos
router.get("/", getAllProducts);

// Ruta para actualizar información de un producto
router.patch("/:id", auth, updateProductById);

// Ruta para eliminar un producto
router.delete("/:id", auth, deleteProductById);

export default router;
