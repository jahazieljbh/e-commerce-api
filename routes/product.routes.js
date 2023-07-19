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

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the product.
 *           example: iPhone 12
 *         slug:
 *           type: string
 *           description: The slug of the product.
 *           example: iphone-12
 *         description:
 *           type: string
 *           description: The description of the product.
 *           example: A high-end smartphone with advanced features.
 *         price:
 *           type: number
 *           description: The price of the product.
 *           example: 999.99
 *         images:
 *           type: array
 *           items:
 *             type: string
 *             description: The URLs of the product images.
 *         colors:
 *           type: array
 *           items:
 *             type: string
 *             description: The available colors of the product.
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *             description: The tags associated with the product.
 *         category:
 *           type: string
 *           description: The ID of the category the product belongs to.
 *         brand:
 *           type: string
 *           description: The brand of the product.
 *           example: Apple
 *         stock:
 *           type: number
 *           description: The stock quantity of the product.
 *           example: 10
 *         sold:
 *           type: number
 *           description: The number of units sold for the product.
 *           example: 5
 *         ratings:
 *           type: array
 *           items:
 *             type: string
 *             description: The IDs of the product ratings.
 *       required:
 *         - name
 *         - slug
 *         - description
 *         - price
 *         - category
 *         - brand
 *         - stock
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
  *   name: Products
  *   description: Product Management Endpoint
  */

/**
 * @swagger
 * /product:
 *   post:
 *     summary: Create a new product.
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Product created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request.
 *       404:
 *         description: Category not found.
 *       500:
 *         description: Internal server error.
 */
router.post("/", auth, isAdmin, createProduct);

/**
 * @swagger
 * /product/{id}:
 *   get:
 *     summary: Get a product by ID.
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product ID.
 *     responses:
 *       200:
 *         description: The product information.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found.
 *       500:
 *         description: Internal server error.
 */
router.get("/:id", getProductById);

/**
 * @swagger
 * /product:
 *   get:
 *     summary: Get all products.
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: A list of products.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Internal server error.
 */
router.get("/", getAllProducts);

/**
 * @swagger
 * /product/{id}:
 *   patch:
 *     summary: Update a product by ID.
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Product updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request.
 *       404:
 *         description: Product not found.
 *       500:
 *         description: Internal server error.
 */
router.patch("/:id", auth, isAdmin, updateProductById);

/**
 * @swagger
 * /product/{id}:
 *   delete:
 *     summary: Delete a product by ID.
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product ID.
 *     responses:
 *       200:
 *         description: Product deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found.
 *       500:
 *         description: Internal server error.
 */
router.delete("/:id", auth, isAdmin, deleteProductById);

/**
 * @swagger
 * /product/category/{category}:
 *   get:
 *     summary: Get all products by category
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         schema:
 *           type: string
 *         description: Category name
 *     responses:
 *       200:
 *         description: Products found successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Internal server error.
 */
router.get("/category/:category", getProductsByCategory);

/**
 * @swagger
 * /product/tag/{tag}:
 *   get:
 *     summary: Get all products by tag
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: tag
 *         required: true
 *         schema:
 *           type: string
 *         description: Tag name
 *     responses:
 *       200:
 *         description: Products found successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Internal server error.
 */
router.get("/tag/:tag", getProductosByTag);

/**
 * @swagger
 * /product/color/{color}:
 *   get:
 *     summary: Get all products by color
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: color
 *         required: true
 *         schema:
 *           type: string
 *         description: Color name
 *     responses:
 *       200:
 *         description: Products found successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Internal server error.
 */
router.get("/color/:color", getProductosByColor);

/**
 * @swagger
 * /product/brand/{brand}:
 *   get:
 *     summary: Get all products by brand
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: brand
 *         required: true
 *         schema:
 *           type: string
 *         description: Brand name
 *     responses:
 *       200:
 *         description: Products found successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Internal server error.
 */
router.get("/brand/:brand", getProductosByBrand);

/**
 * @swagger
 * /product/price-range/{minPrice}-{maxPrice}:
 *   get:
 *     summary: Get all products within a price range
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: minPrice
 *         required: true
 *         schema:
 *           type: number
 *         description: Minimum price
 *       - in: path
 *         name: maxPrice
 *         required: true
 *         schema:
 *           type: number
 *         description: Maximum price
 *     responses:
 *       200:
 *         description: Products found successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Internal server error.
 */
router.get("/price-range/:minPrice-:maxPrice", getProductosByPriceRange);

/**
 * @swagger
 * /product/keyword/{keyword}:
 *   get:
 *     summary: Get all products by keyword in name or description
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: keyword
 *         required: true
 *         schema:
 *           type: string
 *         description: Keyword to search in name or description
 *     responses:
 *       200:
 *         description: Products found successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Internal server error.
 */
router.get("/keyword/:keyword", getProductosByKeyword);

export default router;
