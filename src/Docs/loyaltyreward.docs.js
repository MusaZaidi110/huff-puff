/**
 * @swagger
 * components:
 *   schemas:
 *     LoyaltyReward:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - points_required
 *         - reward_type
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Unique identifier for the loyalty reward (UUIDv4)
 *           example: "e8a1c4d7-9f23-4b76-aabb-123456789abc"
 *         name:
 *           type: string
 *           description: Name of the loyalty reward
 *           example: "10% Discount Coupon"
 *         description:
 *           type: string
 *           nullable: true
 *           description: Description of the loyalty reward
 *           example: "Get 10% off on your next purchase"
 *         points_required:
 *           type: integer
 *           description: Number of points required to redeem this reward
 *           example: 1000
 *         reward_type:
 *           type: string
 *           description: Type of reward
 *           enum:
 *             - discount_percentage
 *             - discount_fixed
 *             - free_item
 *           example: "discount_percentage"
 *         reward_value:
 *           type: number
 *           format: decimal
 *           nullable: true
 *           description: Value of the reward, e.g., percentage or fixed discount amount
 *           example: 10.00
 *         is_active:
 *           type: boolean
 *           description: Indicates if the reward is currently active
 *           default: true
 *           example: true
 *         expires_at:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           description: Expiration date and time of the reward
 *           example: "2025-12-31T23:59:59Z"
 *         free_item_id:
 *           type: string
 *           format: uuid
 *           nullable: true
 *           description: UUID of the free item associated with the reward (if reward_type is 'free_item')
 *           example: "f1234567-89ab-cdef-0123-456789abcdef"
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the reward was created
 *           example: "2025-05-28T10:00:00Z"
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the reward was last updated
 *           example: "2025-05-28T12:00:00Z"
 */
