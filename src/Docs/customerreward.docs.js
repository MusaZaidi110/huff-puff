/**
 * @swagger
 * components:
 *   schemas:
 *     CustomerReward:
 *       type: object
 *       required:
 *         - id
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Unique identifier for the customer reward (UUIDv4)
 *           example: "a3f9e7d6-4c28-4fbb-9c9f-0123456789ab"
 *         is_used:
 *           type: boolean
 *           description: Indicates whether the reward has been used
 *           example: false
 *         used_at:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the reward was used (nullable if not used)
 *           example: "2025-05-28T15:30:00Z"
 *         expires_at:
 *           type: string
 *           format: date-time
 *           description: Expiration date and time of the reward
 *           example: "2025-12-31T23:59:59Z"
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the reward record was created
 *           example: "2025-05-01T10:00:00Z"
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the reward record was last updated
 *           example: "2025-05-15T12:00:00Z"
 *         customer_id:
 *           type: string
 *           format: uuid
 *           description: UUID of the associated customer
 *           example: "8a123456-7890-4bcd-ef01-234567890abc"
 *         reward_id:
 *           type: string
 *           format: uuid
 *           description: UUID of the associated loyalty reward
 *           example: "b1c23456-7890-4def-0123-4567890abcde"
 */
