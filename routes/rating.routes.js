import { Router } from "express";

import {
  createRating,
  getRatingsByProduct,
  getRatingsByUser,
  updateRatingById,
  deleteRatingById,
  getRatingById,
  getAllRatings,
} from "../controllers/rating.controller.js";
import { auth } from "../middlewares/auth.js";

// Crear el router
const router = Router();

// Ruta para crear un nueva calificacion
router.post("/", auth, createRating);

// Ruta para obtener información de todas las calificaciones por producto
router.get("/product/:id", getRatingsByProduct);

// Ruta para obtener información de todas las calificaciones por usuario
router.get("/user/:id", getRatingsByUser);

// Ruta para obtener información de una calificacion
router.get("/:id", getRatingById);

// Ruta para obtener información de todas las calificaciones
router.get("/", getAllRatings);

// Ruta para actualizar información de una calificacion
router.patch("/:id", auth, updateRatingById);

// Ruta para eliminar una calificacion
router.delete("/:id", auth, deleteRatingById);

export default router;
