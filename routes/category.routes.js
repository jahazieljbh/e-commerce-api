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

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the category.
 *           example: Electronics
 *         products:
 *           type: array
 *           items:
 *             type: string
 *             description: The IDs of the products in the category.
 *       required:
 *         - name
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
  *   name: Category
  *   description: Category Management Endpoint
  */

/**
 * @swagger
 * /category:
 *   post:
 *     summary: Create a new category
 *     tags: [Category]
 *     description: Creates a new category.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       201:
 *         description: Category created successfully.
 *       400:
 *         description: Invalid request.
 *       409:
 *         description: Category already exists.
 *       500:
 *         description: An error occurred.
 */
router.post("/", auth, isAdmin, createCategory);

/**
 * @swagger
 * /category/{id}:
 *   get:
 *     summary: Get category by ID
 *     tags: [Category]
 *     description: Retrieves category information by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Category retrieved successfully.
 *       400:
 *         description: Invalid request.
 *       404:
 *         description: Category not found.
 *       500:
 *         description: An error occurred.
 */
router.get("/:id", getCategoryById);

/**
 * @swagger
 * /category:
 *   get:
 *     summary: Get all categories
 *     tags: [Category]
 *     description: Retrieves information of all categories.
 *     responses:
 *       200:
 *         description: Categories retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the request was successful.
 *                   example: true
 *                 count:
 *                   type: integer
 *                   description: The number of categories returned.
 *                   example: 3
 *                 categories:
 *                   type: array
 *                   description: The list of categories.
 *                   items:
 *                     $ref: '#/components/schemas/Category'
 *       400:
 *         description: Invalid request.
 *       404:
 *         description: No categories found.
 *       500:
 *         description: An error occurred.
 */
router.get("/", getAllCategories);

/**
 * @swagger
 * /category/{id}:
 *   patch:
 *     summary: Update category by ID
 *     tags: [Category]
 *     description: Updates category information by ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       200:
 *         description: Category updated successfully.
 *       400:
 *         description: Invalid request.
 *       404:
 *         description: Category not found.
 *       409:
 *         description: Cannot update category with associated products.
 *       500:
 *         description: An error occurred.
 */
router.patch("/:id", auth, isAdmin, updateCategoryById);

/**
 * @swagger
 * /category/{id}:
 *   delete:
 *     summary: Delete category by ID
 *     tags: [Category]
 *     description: Deletes a category by ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Category deleted successfully.
 *       400:
 *         description: Invalid request.
 *       404:
 *         description: Category not found.
 *       409:
 *         description: Cannot delete category with associated products.
 *       500:
 *         description: An error occurred.
 */
router.delete("/:id", auth, isAdmin, deleteCategoryById);

export default router;
