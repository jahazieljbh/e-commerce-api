import { Router } from "express";

import { auth, isAdmin } from "../middlewares/auth.js";

import { createOrder, getOrderByUserId, getOrdersByUser, getAllOrders, updateOrderStatus, captureOrder, cancelOrder } from "../controllers/order.controller.js";

// Crear el router
const router = Router();

router.post("/", auth, createOrder);

router.get("/:id", auth, isAdmin, getOrderByUserId);

router.get("/", auth, getOrdersByUser);

router.get("/all-orders", auth, isAdmin, getAllOrders);

router.patch("/:id", auth, isAdmin, updateOrderStatus);

router.post("/capture", auth, captureOrder);

router.get("/cancel", auth, cancelOrder);

export default router;
