import { Router } from "express";

import {
  createUser,
  deleteUserById,
  updateUser,
  getUserById,
  getAllUsers,
  uploadAvatar,
  getAvatarById,
  loginUser,
  logoutUser,
  logoutAllUsers,
  blockUserById,
  unblockUserById,
  updatePassword,
  forgotPasswordToken,
  resetPassword
} from "../controllers/user.controller.js";
import { auth, isAdmin } from "../middlewares/auth.js";
import upload from "../middlewares/upload.js";

// Crear el router
const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         firstname:
 *           type: string
 *           description: The first name of the user.
 *           example: Jahaziel
 *         lastname:
 *           type: string
 *           description: The last name of the user.
 *           example: Basilio
 *         mobile:
 *           type: string
 *           description: The mobile number of the user.
 *           example: 2712318584
 *         email:
 *           type: string
 *           description: The email address of the user.
 *           example: jahaziel.example@gmail.com
 *         password:
 *           type: string
 *           description: The password of the user.
 *           example: MyPassword123
 *         role:
 *           type: string
 *           enum: [user, admin]
 *           default: user
 *           description: The role of the user.
 *           example: admin
 *       required:
 *         - firstname
 *         - lastname
 *         - mobile
 *         - email
 *         - password
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
  *   name: Users
  *   description: The users managing API
  */

/**
 * @swagger
 * /user/signup:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     description: Creates a new user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                   description: Indicates if the request was successful.
 *                 message:
 *                   type: string
 *                   example: Usuario creado exitosamente
 *                   description: A message describing the result of the operation.
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request. Invalid user data provided.
 *       409:
 *         description: Conflict. User with the same email already exists.
 *       500:
 *         description: Internal server error.
 */
router.post("/signup", createUser);

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Authenticate a user
 *     tags: [Users]
 *     description: Authenticates a user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email address of the user.
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *                 example: Password123
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: User authenticated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                   description: Indicates if the request was successful.
 *                 message:
 *                   type: string
 *                   example: Inicio de sesion correcto
 *                   description: A message describing the result of the operation.
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                   description: The authentication token.
 *       400:
 *         description: Bad request. Invalid email or password.
 *       500:
 *         description: Internal server error.
 */
router.post("/login", loginUser);

/**
 * @swagger
 * /user/logout:
 *   post:
 *     summary: Logout a user
 *     tags: [Users]
 *     description: Logs out a user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User logged out successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                   description: Indicates if the request was successful.
 *                 message:
 *                   type: string
 *                   example: Sesión cerrada correctamente
 *                   description: A message describing the result of the operation.
 *       401:
 *         description: Unauthorized. Invalid or missing authentication token.
 *       500:
 *         description: Internal server error.
 */
router.post("/logout", auth, logoutUser);

/**
 * @swagger
 * /user/logout-all:
 *   post:
 *     summary: Logout user from all devices
 *     tags: [Users]
 *     description: Logs out a user from all devices.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User logged out from all devices successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                   description: Indicates if the request was successful.
 *                 message:
 *                   type: string
 *                   example: Sesiones cerradas correctamente
 *                   description: A message describing the result of the operation.
 */
router.post("/logout-all", auth, logoutAllUsers);

/**
 * @swagger
 * /user/all-users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     description: Retrieves information of all users.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                   description: Indicates if the request was successful.
 *                 count:
 *                   type: number
 *                   example: 1
 *                   description: The number of users returned.
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *                   description: The list of users.
 *       404:
 *         description: No users available.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No hay usuarios disponibles
 *                   description: A message indicating no users are available.
 *       500:
 *         description: An error occurred.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                   description: Indicates if the request was successful.
 *                 error:
 *                   type: string
 *                   example: Error interno del servidor
 *                   description: An error message describing the error.
 */
router.get("/all-users", auth, isAdmin, getAllUsers);

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     description: Retrieves information of a user by ID.
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
 *         description: User information.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                   description: Indicates if the request was successful.
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                   description: The user information.
 *       400:
 *         description: Invalid ID or parameters.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: id no válido
 *                   description: A message indicating the invalid ID.
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: El usuario no existe
 *                   description: A message indicating that the user does not exist.
 *       500:
 *         description: An error occurred.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                   description: Indicates if the request was successful.
 *                 error:
 *                   type: string
 *                   example: Error interno del servidor
 *                   description: An error message describing the error.
 */
router.get("/:id", auth, isAdmin, getUserById);

/**
 * @swagger
 * /user/edit-user:
 *   patch:
 *     summary: Update user information
 *     tags: [Users]
 *     description: Updates information of a user.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *                 description: The first name of the user.
 *                 example: Jahaziel
 *               lastname:
 *                 type: string
 *                 description: The last name of the user.
 *                 example: Basilio
 *               mobile:
 *                 type: string
 *                 description: The mobile number of the user.
 *                 example: 2712318584
 *               email:
 *                 type: string
 *                 description: The email address of the user.
 *                 example: jahaziel.example@gmail.com
*     responses:
 *       200:
 *         description: User updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                   description: Indicates if the request was successful.
 *                 message:
 *                   type: string
 *                   example: Usuario actualizado exitosamente
 *                   description: A message indicating the successful update.
 *                 user:
 *                   type: object
 *                   description: The updated user information.
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid ID or missing data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: No se recibieron datos para actualizar.
 *                   description: A message indicating the missing update data.
 *       403:
 *         description: Invalid update fields.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Actualización no válida campos no permitidos.
 *                   description: A message indicating the invalid update fields.
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: El usuario no existe.
 *                   description: A message indicating that the user does not exist.
 *       500:
 *         description: An error occurred.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                   description: Indicates if the request was successful.
 *                 error:
 *                   type: string
 *                   example: Error interno del servidor
 *                   description: An error message describing the error.
 */
router.patch("/edit-user", auth, updateUser);

/**
 * @swagger
 * /user/password:
 *   patch:
 *     summary: Update user password
 *     tags: [Users]
 *     description: Updates password of a user.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 description: The current password of the user.
 *                 example: Password123
 *               newPassword:
 *                 type: string
 *                 description: The new password of the user.
 *                 example: NewPassword456
 *     responses:
 *       200:
 *         description: User password updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                   description: Indicates if the request was successful.
 *                 message:
 *                   type: string
 *                   example: Contraseña actualizada correctamente
 *                   description: A message indicating the successful password update.
 *       401:
 *         description: Invalid current password.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: La contraseña actual no coincide
 *                   description: A message indicating the mismatch of the current password.
 *       500:
 *         description: An error occurred.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                   description: Indicates if the request was successful.
 *                 message:
 *                   type: string
 *                   example: Error al intentar actualizar la contraseña
 *                   description: An error message describing the error.
 */
router.patch("/password", auth, updatePassword);

/**
 * @swagger
 * /user/forgot-password-token:
 *   post:
 *     summary: Generate password recovery token
 *     tags: [Users]
 *     description: Generates a password recovery token for a user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email address of the user.
 *                 example: jahaziel.example@gmail.com
 *     responses:
 *       200:
 *         description: Password recovery token generated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                   description: Indicates if the request was successful.
 *                 message:
 *                   type: string
 *                   example: Se ha enviado un correo electrónico con el token de restablecimiento de contraseña.
 *                   description: A message indicating the successful generation of the password recovery token.
 *       400:
 *         description: Missing or invalid email.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: El correo electrónico es requerido
 *                   description: A message indicating that the email is required.
 *       500:
 *         description: An error occurred.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                   description: Indicates if the request was successful.
 *                 message:
 *                   type: string
 *                   example: Error interno del servidor
 *                   description: An error message describing the error.
 */
router.post("/forgot-password-token", forgotPasswordToken);

/**
 * @swagger
 * /user/reset-password/{token}:
 *   patch:
 *     summary: Reset user password
 *     tags: [Users]
 *     description: Resets the password of a user using the recovery token.
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Password recovery token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 description: The new password for the user.
 *                 example: NewPassword123
 *     responses:
 *       200:
 *         description: User password reset successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                   description: Indicates if the request was successful.
 *                 message:
 *                   type: string
 *                   example: Su contraseña se ha actualizado correctamente
 *                   description: A message indicating the successful password reset.
 *       400:
 *         description: Invalid or expired password recovery token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: El token de restablecimiento de contraseña no es válido o ha expirado.
 *                   description: A message indicating that the password recovery token is invalid or expired.
 *       500:
 *         description: An error occurred.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                   description: Indicates if the request was successful.
 *                 message:
 *                   type: string
 *                   example: Error interno del servidor
 *                   description: An error message describing the error.
 */
router.patch("/reset-password/:token", resetPassword);

/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Delete user by ID
 *     tags: [Users]
 *     description: Deletes a user by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                   description: Indicates if the request was successful.
 *                 message:
 *                   type: string
 *                   example: Usuario eliminado exitosamente
 *                   description: A message indicating the successful deletion of the user.
 *       400:
 *         description: Invalid or missing parameters.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Parámetros no válidos
 *                   description: A message indicating that the parameters are invalid or missing.
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Usuario no encontrado
 *                   description: A message indicating that the user was not found.
 *       500:
 *         description: An error occurred.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                   description: Indicates if the request was successful.
 *                 error:
 *                   type: string
 *                   example: Error interno del servidor
 *                   description: An error message describing the error.
 */
router.delete("/:id", auth, isAdmin, deleteUserById);

/**
 * @swagger
 * /user/avatar:
 *   post:
 *     summary: Upload user avatar
 *     tags: [Users]
 *     description: Uploads an avatar for a user.
 *     parameters:
 *       - in: formData
 *         name: avatar
 *         type: file
 *         required: true
 *         description: The avatar image file to upload.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Avatar uploaded successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                   description: Indicates if the request was successful.
 *                 message:
 *                   type: string
 *                   example: Imagen de perfil subido exitosamente
 *                   description: A message indicating the successful upload of the user's avatar.
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                   description: The updated user object.
 *       400:
 *         description: Invalid or missing parameters.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No se ha enviado ningún archivo
 *                   description: A message indicating that no file was sent.
 *       500:
 *         description: An error occurred.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                   description: Indicates if the request was successful.
 *                 error:
 *                   type: string
 *                   example: Error interno del servidor
 *                   description: An error message describing the error.
 */
router.post("/avatar", auth, upload.single("avatar"), uploadAvatar);

/**
 * @swagger
 * /user/avatar/{id}:
 *   get:
 *     summary: Get user avatar by ID
 *     tags: [Users]
 *     description: Retrieves the avatar of a user by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User avatar.
 *         content:
 *           image/jpeg:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: Resource not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Recurso no encontrado
 *                   description: A message indicating that the resource (avatar) was not found.
 *       500:
 *         description: An error occurred.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error interno del servidor
 *                   description: A message indicating an internal server error.
 */
router.get("/avatar/:id", auth, getAvatarById);

/**
 * @swagger
 * /user/block/{id}:
 *   patch:
 *     summary: Block user by ID
 *     tags: [Users]
 *     description: Blocks a user by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User blocked successfully.
 *       400:
 *         description: Bad request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: id no válido
 *                   description: A message indicating that the provided ID is not valid.
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuario no encontrado
 *                   description: A message indicating that the user was not found.
 *       403:
 *         description: Forbidden.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No puedes bloquear tu propia cuenta
 *                   description: A message indicating that the user cannot block their own account.
 *       500:
 *         description: An error occurred.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error interno del servidor
 *                   description: A message indicating an internal server error.
 */
router.patch("/block/:id", auth, isAdmin, blockUserById);

/**
 * @swagger
 * /user/unblock/{id}:
 *   patch:
 *     summary: Unblock user by ID
 *     tags: [Users]
 *     description: Unblocks a user by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User unblocked successfully.
 *       400:
 *         description: Bad request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: id no válido
 *                   description: A message indicating that the provided ID is not valid.
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuario no encontrado
 *                   description: A message indicating that the user was not found.
 *       500:
 *         description: An error occurred.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error interno del servidor
 *                   description: A message indicating an internal server error.
 */
router.patch("/unblock/:id", auth, isAdmin, unblockUserById);

export default router;
