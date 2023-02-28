import { Router } from "express";

import {auth, isAdmin} from "../utils/auth.js";

// Crear el router
const router = Router();

// Ruta para agregar un pedido
router.post("/order", auth, addOrder);

// Ruta para obtener información de un pedido
router.get("/order/:id", auth, getOrderById);

// Ruta para obtener información de todos los pedidos
router.get("/orders", auth, getOrders);

// Ruta para actualizar el estado de un pedido
router.patch("/order/:id", auth, updateOrderById);

export default router;
