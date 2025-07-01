/**
 * @swagger
 * components:
 *   schemas:
 *     OTP:
 *       type: object
 *       description: One-Time Password (OTP) entity used for email verification or password reset.
 *       required:
 *         - id
 *         - OTP
 *         - OTP_type
 *         - user_id
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Unique identifier for the OTP record.
 *           example: "a1b2c3d4-e5f6-7a8b-9c0d-e1f2a3b4c5d6"
 *         
 *         OTP:
 *           type: integer
 *           description: The numeric OTP code sent to the user.
 *           example: 123456
 *         
 *         OTP_type:
 *           type: string
 *           enum:
 *             - email_verification
 *             - password_reset
 *           default: email_verification
 *           description: Type of OTP, used for different purposes like verifying email or resetting password.
 *           example: "password_reset"
 *         
 *         is_used:
 *           type: boolean
 *           description: Indicates whether the OTP has been used.
 *           default: false
 *           example: false
 *         
 *         user_id:
 *           type: string
 *           format: uuid
 *           description: ID of the user this OTP belongs to.
 *           example: "9f8e7d6c-5b4a-3210-9fed-cba987654321"
 *         
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the OTP was created.
 *           example: "2025-05-30T08:00:00Z"
 *         
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the OTP was last updated.
 *           example: "2025-05-30T08:15:00Z"
 */
