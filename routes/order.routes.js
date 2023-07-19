import { Router } from "express";

import { auth, isAdmin } from "../middlewares/auth.js";

import { createOrder, getOrderByUserId, getOrdersByUser, getAllOrders, updateOrderStatus, captureOrder, cancelOrder } from "../controllers/order.controller.js";

// Crear el router
const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         user:
 *           type: string
 *           description: The ID of the user who placed the order.
 *           example: 613b96598f8db8126c489b93
 *         shippingAddress:
 *           type: string
 *           description: The ID of the shipping address for the order.
 *           example: 613b96598f8db8126c489b94
 *         products:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               product:
 *                 type: string
 *                 description: The ID of the product in the order.
 *                 example: 613b96598f8db8126c489b95
 *               price:
 *                 type: number
 *                 description: The price of the product in the order.
 *                 example: 99.99
 *               color:
 *                 type: string
 *                 description: The selected color of the product in the order.
 *                 example: Red
 *               quantity:
 *                 type: number
 *                 description: The quantity of the product in the order.
 *                 example: 2
 *               selected:
 *                 type: boolean
 *                 description: Indicates if the product is selected in the order.
 *                 example: true
 *               subtotal:
 *                 type: number
 *                 description: The subtotal (price x quantity) of the product in the order.
 *                 example: 199.98
 *         total:
 *           type: number
 *           description: The total value of the order.
 *           example: 199.98
 *         paymentIntent:
 *           type: object
 *           description: The payment intent associated with the order.
 *         paymentId:
 *           type: string
 *           description: The payment ID associated with the order.
 *           example: abc123xyz456
 *         status:
 *           type: string
 *           enum:
 *             - Pendiente
 *             - Cancelado
 *             - Pagado
 *             - Procesando
 *             - Enviado
 *             - Completado
 *           description: The status of the order.
 *           example: Pagado
 *       required:
 *         - user
 *         - shippingAddress
 *         - products
 *         - total
 *         - status
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       name: Bearer Authentication
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: The orders managing API
 */

/**
 * @swagger
 * /order:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       201:
 *         description: Order created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Internal server error.
 */
router.post("/", auth, createOrder);

/**
 * @swagger
 * /order/{id}:
 *   get:
 *     summary: Get order by user ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: Order found successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden, user is not an admin.
 *       404:
 *         description: Order not found.
 *       500:
 *         description: Internal server error.
 */
router.get("/:id", auth, isAdmin, getOrderByUserId);

/**
 * @swagger
 * /order:
 *   get:
 *     summary: Get all orders of a user
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Orders found successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Internal server error.
 */
router.get("/", auth, getOrdersByUser);

/**
 * @swagger
 * /order/all-orders:
 *   get:
 *     summary: Get all orders (Admin)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Orders found successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       401:
 *         description: Unauthorized, user is not an admin.
 *       500:
 *         description: Internal server error.
 */
router.get("/all-orders", auth, isAdmin, getAllOrders);

/**
 * @swagger
 * /order/{id}:
 *   patch:
 *     summary: Update the status of an order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [Pendiente, Cancelado, Pagado, Procesando, Enviado, Completado]
 *     responses:
 *       200:
 *         description: Order status updated successfully.
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden, user is not an admin.
 *       404:
 *         description: Order not found.
 *       500:
 *         description: Internal server error.
 */
router.patch("/:id", auth, isAdmin, updateOrderStatus);

/**
 * @swagger
 * /order/capture:
 *   post:
 *     summary: Capture an order (Payment)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               paymentId:
 *                 type: string
 *                 description: The payment ID associated with the order.
 *                 example: abc123xyz456
 *               paymentIntent:
 *                 type: object
 *                 description: The payment intent associated with the order.
 *     responses:
 *       200:
 *         description: Order captured successfully.
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden, user is not an admin.
 *       404:
 *         description: Order not found.
 *       500:
 *         description: Internal server error.
 */
router.post("/capture", auth, captureOrder);

/**
 * @swagger
 * /order/cancel:
 *   post:
 *     summary: Cancel an order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               paymentId:
 *                 type: string
 *                 description: The payment ID associated with the order.
 *                 example: abc123xyz456
 *     responses:
 *       200:
 *         description: Order canceled successfully.
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden, user is not an admin.
 *       404:
 *         description: Order not found.
 *       500:
 *         description: Internal server error.
 */
router.post("/cancel", auth, cancelOrder);

export default router;
