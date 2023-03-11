import { Router } from "express";

import {
  createAddress,
  setDefaultAddress,
  updateAddressById,
  deleteAddressById,
  getAddressById,
  getAllAddresses,
} from "../controllers/address.controller.js";
import { auth } from "../utils/auth.js";

// Crear el router
const router = Router();

// Ruta para crear un nueva dirección
router.post("/", auth, createAddress);

// Ruta para establecer dirección por defecto
router.post("/", auth, setDefaultAddress);

// Ruta para obtener información de una dirección
router.get("/:id", auth, getAddressById);

// Ruta para obtener información de todas las direcciónes
router.get("/", auth, getAllAddresses);

// Ruta para actualizar información de una dirección
router.patch("/:id", auth, updateAddressById);

// Ruta para eliminar una dirección
router.delete("/:id", auth, deleteAddressById);

export default router;
