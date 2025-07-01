const express = require("express");
const router = express.Router();

// Implementation 
const {createCustomerAuth} = require("../Functionality/Authentication/CreateUserAuth");
const {loginCustomerAuth} = require("../Functionality/Authentication/LoginUserAuth");
const {forgotPassword} = require("../Functionality/Authentication/ForgetPassword");

// Validation
const Joi = require("joi");
const {validateRequest} = require("../Middlewares/ValidateRequest");

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});


router.post("/register", validateRequest(registerSchema), createCustomerAuth);

router.post("/login", validateRequest(registerSchema), loginCustomerAuth);

router.post("/forget-password", forgotPassword);
module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Customer registration and authentication with OTP verification
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new customer
 *     description: |
 *       Creates a new customer account with email verification via OTP.
 *       The account will be inactive until OTP verification is completed.
 *       System will:
 *       - Validate email and password
 *       - Create user with hashed password
 *       - Generate and store OTP
 *       - Send OTP to provided email
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: customer@example.com
 *                 description: Must be a valid email format
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 6
 *                 example: securePassword123
 *                 description: Must be at least 6 characters long
 *     responses:
 *       201:
 *         description: Customer registered successfully (OTP sent to email)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: User registered successfully
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 123
 *                     email:
 *                       type: string
 *                       example: customer@example.com
 *                     role:
 *                       type: string
 *                       example: customer
 *                     is_active:
 *                       type: boolean
 *                       example: false
 *                       description: Will remain false until OTP verification
 *       400:
 *         description: Validation error (invalid email or password format)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Password must be at least 6 characters long
 *       409:
 *         description: Conflict - email already registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: User with this email already exists
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */