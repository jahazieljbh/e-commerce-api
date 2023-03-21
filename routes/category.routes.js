import { Router } from "express";

import {
  createCategory,
  updateCategoryById,
  deleteCategoryById,
  getCategoryById,
  getAllCategories,
} from "../controllers/category.controller.js";
import { auth, isAdmin } from "../middlewares/auth.js";

// Crear el router
const router = Router();

// Ruta para crear un nueva categoria
router.post("/", auth, isAdmin, createCategory);

// Ruta para obtener información de una categoria
router.get("/:id", getCategoryById);

// Ruta para obtener información de todas las categorias
router.get("/", getAllCategories);

// Ruta para actualizar información de una categoria
router.patch("/:id", auth, isAdmin, updateCategoryById);

// Ruta para eliminar una categoria
router.delete("/:id", auth, isAdmin, deleteCategoryById);

export default router;
