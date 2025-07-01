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
 * tags:
 *   - name: Authentication
 *     description: User registration and authentication endpoints
 *
 * /auth/register:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Register a new customer user with email and password
 *     description: >
 *       Creates a new user with role "customer".<br/>
 *       Validates input, hashes password, saves user, generates OTP for verification, and sends OTP email.<br/>
 *       User is created with `is_active` set to false until verification is completed.<br/>
 *       Uses a transaction to ensure database consistency.<br/>
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
 *                 description: User's unique email address
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 description: Password with minimum 6 characters
 *                 example: mySecurePass123
 *     responses:
 *       201:
 *         description: User registered successfully and OTP sent for verification
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
 *                       example: user@example.com
 *                     role:
 *                       type: string
 *                       example: customer
 *       400:
 *         description: Bad request due to validation failure (missing or invalid fields)
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
 *         description: Conflict - User with this email already exists
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
