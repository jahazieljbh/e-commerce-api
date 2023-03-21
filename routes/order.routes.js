import { Router } from "express";

import { auth, isAdmin } from "../middlewares/auth.js";

import { createOrder, getOrderByUserId, getOrdersByUser, getAllOrders, updateOrderStatus, captureOrder, cancelOrder } from "../controllers/order.controller.js";

// Crear el router
const router = Router();

// Ruta para la creación de una nueva orden.
router.post("/", auth, createOrder);

// Ruta para obtener una orden por su ID de usuario.
router.get("/:id", auth, isAdmin, getOrderByUserId);

// Ruta para obtener todas las órdenes de un usuario.
router.get("/", auth, getOrdersByUser);

// Ruta para obtener todas las órdenes.
router.get("/all-orders", auth, isAdmin, getAllOrders);

// Ruta para actualizar el estado de una orden por su ID.
router.patch("/:id", auth, isAdmin, updateOrderStatus);

// Ruta para la captura de una orden.
router.post("/capture", auth, captureOrder);

// Ruta para la cancelación de una orden.
router.post("/cancel", auth, cancelOrder);

export default router;
