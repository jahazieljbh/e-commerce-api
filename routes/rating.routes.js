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

/**
 * @swagger
 * components:
 *   schemas:
 *     Rating:
 *       type: object
 *       properties:
 *         product:
 *           type: string
 *           description: The ID of the product being rated.
 *           example: 613b96598f8db8126c489b94
 *         user:
 *           type: string
 *           description: The ID of the user who is rating the product.
 *           example: 613b96598f8db8126c489b93
 *         rating:
 *           type: number
 *           description: The rating value given to the product.
 *           example: 8
 *         comment:
 *           type: string
 *           description: The comment or review text associated with the rating.
 *           example: This product exceeded my expectations!
 *       required:
 *         - product
 *         - user
 *         - rating
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
 *   name: Rating
 *   description: The ratings managing API
 */

/**
 * @swagger
 * /rating:
 *   post:
 *     summary: Create a new rating
 *     tags: [Rating]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Rating'
 *     responses:
 *       201:
 *         description: The rating was successfully created
 *       400:
 *         description: Missing parameters
 *       500:
 *         description: Internal error
 */
router.post("/", auth, createRating);

/**
 * @swagger
 * /rating/product/{id}:
 *   get:
 *     summary: Get ratings by product ID
 *     tags: [Rating]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product ID
 *     responses:
 *       200:
 *         description: A list of ratings for the specified product
 *       404:
 *         description: No ratings found for this product
 *       500:
 *         description: Internal error
 */
router.get("/product/:id", getRatingsByProduct);

/**
 * @swagger
 * /rating/user/{id}:
 *   get:
 *     summary: Get ratings by user ID
 *     tags: [Rating]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: A list of ratings by the specified user
 *       404:
 *         description: No ratings found for this user
 *       500:
 *         description: Internal error
 */
router.get("/user/:id", getRatingsByUser);

/**
 * @swagger
 * /rating/{id}:
 *   get:
 *     summary: Get a rating by its ID
 *     tags: [Rating]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The rating ID
 *     responses:
 *       200:
 *         description: The rating details
 *       404:
 *         description: No rating found with this ID
 *       500:
 *         description: Internal error
 */

router.get("/:id", getRatingById);

/**
 * @swagger
 * /rating:
 *   get:
 *     summary: Get all ratings
 *     tags: [Rating]
 *     responses:
 *       200:
 *         description: A list of all ratings
 *       404:
 *         description: No ratings found
 *       500:
 *         description: Internal error
 */
router.get("/", getAllRatings);

/**
 * @swagger
 * /rating/{id}:
 *   patch:
 *     summary: Update a rating by its ID
 *     tags: [Rating]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The rating ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Rating'
 *     responses:
 *       200:
 *         description: The rating was successfully updated
 *       400:
 *         description: Missing parameters
 *       404:
 *         description: No rating found with this ID
 *       500:
 *         description: Internal error
 */
router.patch("/:id", auth, updateRatingById);

/**
 * @swagger
 * /rating/{id}:
 *   delete:
 *     summary: Delete a rating by its ID
 *     tags: [Rating]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The rating ID
 *     responses:
 *       200:
 *         description: The rating was successfully deleted
 *       404:
 *         description: No rating found with this ID
 *       500:
 *         description: Internal error
 */
router.delete("/:id", auth, deleteRatingById);

export default router;
