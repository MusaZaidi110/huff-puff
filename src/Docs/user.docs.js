/**
 * @swagger
 * tags:
 *   - name: Authentication
 *     description: User registration, login, and password management
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       description: User account information including authentication details and profile data.
 *       required:
 *         - id
 *         - email
 *         - password
 *         - role
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Unique identifier for the user.
 *           example: "d1f7e9c0-8b62-4d3e-9b43-97c7b7f01234"
 * 
 *         email:
 *           type: string
 *           format: email
 *           description: User's unique email address used for login.
 *           example: "user@example.com"
 * 
 *         phone_number:
 *           type: string
 *           nullable: true
 *           description: User's unique phone number.
 *           example: "+1234567890"
 * 
 *         password:
 *           type: string
 *           format: password
 *           description: Hashed password for user authentication.
 *           example: "$2b$10$Xq1Yp..."
 * 
 *         role:
 *           type: string
 *           enum:
 *             - customer
 *             - staff
 *             - delivery_person
 *           description: Role assigned to the user within the system.
 *           example: "customer"
 * 
 *         user_name:
 *           type: string
 *           nullable: true
 *           description: Optional display name or username of the user.
 *           example: "john_doe"
 * 
 *         email_verified_at:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           description: Timestamp when the user's email was verified.
 *           example: "2025-05-29T14:30:00Z"
 * 
 *         profile_image_url:
 *           type: string
 *           nullable: true
 *           description: URL to the user's profile image.
 *           example: "https://example.com/images/profiles/123.jpg"
 * 
 *         socket_id:
 *           type: string
 *           nullable: true
 *           description: Current socket connection ID for real-time features.
 *           example: "socket123abc456"
 * 
 *         is_active:
 *           type: boolean
 *           description: Indicates if the user's account is active.
 *           default: false
 *           example: true
 * 
 *         last_login_at:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           description: Timestamp of the last login by the user.
 *           example: "2025-05-29T15:00:00Z"
 * 
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the user account was created.
 *           example: "2025-05-01T10:00:00Z"
 * 
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the user account was last updated.
 *           example: "2025-05-28T12:00:00Z"
 */


/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new customer user
 *     tags: [Authentication]
 *     description: >
 *       Creates a new customer account with email and password, generates and stores OTP, and sends OTP to the user's email for verification.
 *       - Validates email and password format.
 *       - Hashes password before storing.
 *       - Creates user with `is_active: false`.
 *       - Sends OTP email after transaction completion.
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
 *                 description: Valid email address.
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Password (minimum 6 characters).
 *                 example: securePass123
 *     responses:
 *       201:
 *         description: User registered successfully; OTP sent for verification.
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
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Validation error.
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
 *                   example: Email and password are required fields
 *       409:
 *         description: User with this email already exists.
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
 *         description: Internal server error.
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


/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login customer user
 *     tags: [Authentication]
 *     description: >
 *       Logs in a customer user with email and password:
 *       - Validates email and password.
 *       - Checks if the user exists.
 *       - Verifies password hash.
 *       - Returns authentication token or JWT on success.
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
 *                 description: User's registered email address.
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 description: User's password.
 *                 example: securePass123
 *     responses:
 *       200:
 *         description: Login successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 token:
 *                   type: string
 *                   description: JWT authentication token.
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6...
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Validation error or missing fields.
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
 *                   example: Email and password are required fields
 *       401:
 *         description: Invalid email or password.
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
 *                   example: Invalid email or password
 *       500:
 *         description: Internal server error.
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


/**
 * @swagger
 * /forget-password:
 *   post:
 *     summary: Request password reset OTP
 *     tags: [Authentication]
 *     description: >
 *       Sends a password reset OTP to the user's email for resetting the password.
 *       - Validates email format.
 *       - Checks if the user exists.
 *       - Generates and stores OTP.
 *       - Sends OTP via email.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Registered email address for the user.
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: OTP sent successfully.
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
 *                   example: OTP sent to email for password reset
 *       400:
 *         description: Validation error or missing fields.
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
 *                   example: Email is required
 *       404:
 *         description: User with the provided email does not exist.
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
 *                   example: User with this email does not exist
 *       500:
 *         description: Internal server error.
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
