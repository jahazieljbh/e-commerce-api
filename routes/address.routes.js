import { Router } from "express";

import {
  createAddress,
  setDefaultAddress,
  updateAddressById,
  deleteAddressById,
  getAddressById,
  getAllAddresses,
} from "../controllers/address.controller.js";
import { auth } from "../middlewares/auth.js";

// Crear el router
const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Address:
 *       type: object
 *       properties:
 *         user:
 *           type: string
 *           description: The ID of the user to whom the address belongs.
 *           example: 613b96598f8db8126c489b93
 *         addressName:
 *           type: string
 *           description: The name of the address.
 *           example: Home
 *         addressLine1:
 *           type: string
 *           description: The first line of the address.
 *           example: 123 Main Street
 *         addressLine2:
 *           type: string
 *           description: The second line of the address.
 *           example: Apartment 4B
 *         city:
 *           type: string
 *           description: The city of the address.
 *           example: New York
 *         state:
 *           type: string
 *           description: The state of the address.
 *           example: NY
 *         country:
 *           type: string
 *           description: The country of the address.
 *           example: USA
 *         zipcode:
 *           type: string
 *           description: The ZIP code of the address.
 *           example: 10001
 *         isDefault:
 *           type: boolean
 *           description: Indicates whether the address is the default address for the user.
 *       required:
 *         - user
 *         - addressName
 *         - addressLine1
 *         - city
 *         - state
 *         - country
 *         - zipcode
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
 *   name: Addresses
 *   description: The addresses managing API
 */


/**
 * @swagger
 * /address:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Create a new address
 *     tags: [Addresses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Address'
 *     responses:
 *       201:
 *         description: The address was successfully created
 *       400:
 *         description: Missing parameters
 *       500:
 *         description: Some error happened
 */
router.post("/", auth, createAddress);

/**
 * @swagger
 * /address/default/{id}:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Set an address as default
 *     tags: [Addresses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The address id
 *     responses:
 *       200:
 *         description: The address was successfully set as default
 *       401:
 *         description: Unauthorized access
 *       500:
 *         description: Some error happened
 */
router.post("/default/:id", auth, setDefaultAddress);

/**
 * @swagger
 * /address/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get an address by id
 *     tags: [Addresses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The address id
 *     responses:
 *       200:
 *         description: The address data
 *       401:
 *         description: Unauthorized access
 *       404:
 *         description: The address was not found
 *       500:
 *         description: Some error happened
 */
router.get("/:id", auth, getAddressById);

/**
 * @swagger
 * /address:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get all addresses
 *     tags: [Addresses]
 *     responses:
 *       200:
 *         description: The list of the addresses
 *       404:
 *         description: No addresses were found
 *       500:
 *         description: Some error happened
 */
router.get("/", auth, getAllAddresses);

/**
 * @swagger
 * /address/{id}:
 *   patch:
 *     security:
 *       - bearerAuth: []
 *     summary: Update an address by id
 *     tags: [Addresses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The address id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Address'
 *     responses:
 *       200:
 *         description: The address was successfully updated
 *       400:
 *         description: Missing parameters
 *       401:
 *         description: Unauthorized access
 *       404:
 *         description: The address was not found
 *       500:
 *         description: Some error happened
 */
router.patch("/:id", auth, updateAddressById);

/**
 * @swagger
 * /address/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Delete an address by id
 *     tags: [Addresses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The address id
 *     responses:
 *       200:
 *         description: The address was successfully deleted
 *       401:
 *         description: Unauthorized access
 *       404:
 *         description: The address was not found
 *       500:
 *         description: Some error happened
 */
router.delete("/:id", auth, deleteAddressById);

export default router;
