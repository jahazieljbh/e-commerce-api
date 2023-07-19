import { Router } from "express";

import {
  createCart,
  deleteCartById,
  updateCartById,
  getCartById,
  getAllCarts,
  addProductToCart,
  removeProductFromCart,
  getProductFromCart,
  getAllProductsFromCart,
  updateQuantity,
  selectProduct,
} from "../controllers/cart.controller.js";

import { auth } from "../middlewares/auth.js";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Cart:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the cart.
 *           example: My Cart
 *         user:
 *           type: string
 *           description: The ID of the user to whom the cart belongs.
 *           example: 613b96598f8db8126c489b93
 *         products:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CartProduct'
 *         total:
 *           type: number
 *           description: The total value of the cart.
 *           example: 199.98
 *       required:
 *         - name
 *         - user
 *         - products
 *         - total
 *
 *     CartProduct:
 *       type: object
 *       properties:
 *         product:
 *           type: string
 *           description: The ID of the product in the cart.
 *           example: 613b96598f8db8126c489b94
 *         price:
 *           type: number
 *           description: The price of the product in the cart.
 *           example: 99.99
 *         color:
 *           type: string
 *           description: The selected color of the product in the cart.
 *           example: Red
 *         quantity:
 *           type: number
 *           description: The quantity of the product in the cart.
 *           example: 2
 *         selected:
 *           type: boolean
 *           description: Indicates if the product is selected in the cart.
 *           example: true
 *         subtotal:
 *           type: number
 *           description: The subtotal (price x quantity) of the product in the cart.
 *           example: 199.98
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
 *   name: Carts
 *   description: The addresses managing API
 */

/**
 * @swagger
 * /cart:
 *   post:
 *     summary: Create a new cart
 *     tags: [Carts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cart'
 *     responses:
 *       201:
 *         description: Cart created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       400:
 *         description: Bad request.
 *       500:
 *         description: Internal server error.
 */
router.post("/", auth, createCart);

/**
 * @swagger
 * /cart/{id}:
 *   delete:
 *     summary: Delete cart by ID
 *     tags: [Carts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Cart ID
 *     responses:
 *       200:
 *         description: Cart deleted successfully.
 *       400:
 *         description: Bad request.
 *       404:
 *         description: Cart not found.
 *       500:
 *         description: Internal server error.
 */
router.delete("/:id", auth, deleteCartById);

/**
 * @swagger
 * /cart/{id}:
 *   patch:
 *     summary: Update cart by ID
 *     tags: [Carts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Cart ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cart'
 *     responses:
 *       200:
 *         description: Cart updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       400:
 *         description: Bad request.
 *       404:
 *         description: Cart not found.
 *       500:
 *         description: Internal server error.
 */
router.patch("/:id", auth, updateCartById);

/**
 * @swagger
 * /cart/{id}:
 *   get:
 *     summary: Get cart by ID
 *     tags: [Carts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Cart ID
 *     responses:
 *       200:
 *         description: Cart found successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       400:
 *         description: Bad request.
 *       404:
 *         description: Cart not found.
 *       500:
 *         description: Internal server error.
 */
router.get("/:id", auth, getCartById);

/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Get all carts
 *     tags: [Carts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Carts found successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cart'
 *       500:
 *         description: Internal server error.
 */
router.get("/", auth, getAllCarts);

/**
 * @swagger
 * /cart/product/{id}:
 *   post:
 *     summary: Add a product to the cart
 *     tags: [Carts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Cart ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CartProduct'
 *     responses:
 *       200:
 *         description: Product added to the cart successfully.
 *       400:
 *         description: Bad request.
 *       404:
 *         description: Cart or product not found.
 *       500:
 *         description: Internal server error.
 */
router.post("/product/:id", auth, addProductToCart);

/**
 * @swagger
 * /cart/product/{id}:
 *   delete:
 *     summary: Remove a product from the cart
 *     tags: [Carts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Cart ID
 *     responses:
 *       200:
 *         description: Product removed from the cart successfully.
 *       400:
 *         description: Bad request.
 *       404:
 *         description: Cart or product not found.
 *       500:
 *         description: Internal server error.
 */
router.delete("/product/:id", auth, removeProductFromCart);

/**
 * @swagger
 * /cart/product/{id}:
 *   get:
 *     summary: Get a product from the cart
 *     tags: [Carts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Cart ID
 *     responses:
 *       200:
 *         description: Product found in the cart successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CartProduct'
 *       400:
 *         description: Bad request.
 *       404:
 *         description: Cart or product not found.
 *       500:
 *         description: Internal server error.
 */
router.get("/product/:id", auth, getProductFromCart);

/**
 * @swagger
 * /cart/products:
 *   get:
 *     summary: Get all products from the cart
 *     tags: [Carts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Products found in the cart successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CartProduct'
 *       500:
 *         description: Internal server error.
 */
router.get("/products", auth, getAllProductsFromCart);

/**
 * @swagger
 * /cart/product/quantity/{id}:
 *   patch:
 *     summary: Update quantity of a product in the cart
 *     tags: [Carts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Cart ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CartProduct'
 *     responses:
 *       200:
 *         description: Quantity of the product in the cart updated successfully.
 *       400:
 *         description: Bad request.
 *       404:
 *         description: Cart or product not found.
 *       500:
 *         description: Internal server error.
 */
router.patch("/product/quantity/:id", auth, updateQuantity);

/**
 * @swagger
 * /cart/product/select/{id}:
 *   patch:
 *     summary: Select a product in the cart
 *     tags: [Carts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Cart ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CartProduct'
 *     responses:
 *       200:
 *         description: Product in the cart selected successfully.
 *       400:
 *         description: Bad request.
 *       404:
 *         description: Cart or product not found.
 *       500:
 *         description: Internal server error.
 */
router.patch("/product/select/:id", auth, selectProduct);

export default router;
