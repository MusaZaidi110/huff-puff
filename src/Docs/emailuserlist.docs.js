/**
 * @swagger
 * components:
 *   schemas:
 *     EmailUserList:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - users_email
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Unique identifier for the user email list (UUIDv4)
 *           example: "d4b9b9a8-3e7c-4f3a-91a7-0f839d43bce9"
 *         name:
 *           type: string
 *           description: Name of the email user list (must be unique)
 *           example: "Newsletter Subscribers"
 *         description:
 *           type: string
 *           description: Optional description of the email user list
 *           example: "List of users subscribed to the monthly newsletter"
 *         users_email:
 *           type: array
 *           description: Array of user emails or IDs (preferably emails)
 *           items:
 *             type: string
 *             format: email
 *           example:
 *             - "user1@example.com"
 *             - "user2@example.com"
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the email user list was created
 *           example: "2025-05-28T10:00:00Z"
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the email user list was last updated
 *           example: "2025-05-29T12:00:00Z"
 */
