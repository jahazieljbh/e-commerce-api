import { Router } from "express";

import { auth, isAdmin } from "../middlewares/auth.js";
import {
  createProduct,
  getProductById,
  getAllProducts,
  updateProductById,
  deleteProductById,
  getProductsByCategory,
  getProductosByTag,
  getProductosByColor,
  getProductosByBrand,
  getProductosByPriceRange,
  getProductosByKeyword,
} from "../controllers/product.controller.js";

// Crear el router
const router = Router();

// Ruta para agregar un producto.
router.post("/", auth, isAdmin, createProduct);

// Ruta para obtener información de un producto.
router.get("/:id", getProductById);

// Ruta para obtener información de todos los productos.
router.get("/", getAllProducts);

// Ruta para actualizar información de un producto.
router.patch("/:id", auth, isAdmin, updateProductById);

// Ruta para eliminar un producto.
router.delete("/:id", auth, isAdmin, deleteProductById);

// Ruta para obtener todos los productos de una categoría específica.
router.get("/category/:category", getProductsByCategory);

// Ruta para obtener todos los productos con una etiqueta específica.
router.get("/tag/:tag", getProductosByTag);

// Ruta para obtener todos los productos de un color específico.
router.get("/color/:color", getProductosByColor);

// Ruta para obtener todos los productos de una marca específica.
router.get("/brand/:brand", getProductosByBrand);

// Ruta para obtener todos los productos dentro de un rango de precios específico.
router.get("/price-range/:minPrice-:maxPrice", getProductosByPriceRange);

// Ruta para obtener todos los productos que coincidan con una palabra clave específica en su nombre o descripción.
router.get("/keyword/:keyword", getProductosByKeyword);

export default router;
