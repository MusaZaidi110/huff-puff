/**
 * @swagger
 * components:
 *   schemas:
 *     LoyaltyPointsTransaction:
 *       type: object
 *       required:
 *         - id
 *         - points
 *         - transaction_type
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Unique identifier for the loyalty points transaction (UUIDv4)
 *           example: "d9f1c8e5-1234-4b5f-a2c3-789012345678"
 *         points:
 *           type: integer
 *           description: Number of points involved in the transaction
 *           example: 100
 *         transaction_type:
 *           type: string
 *           description: Type of loyalty points transaction
 *           enum:
 *             - earned
 *             - redeemed
 *             - referral
 *             - expired
 *             - adjusted
 *           example: "earned"
 *         description:
 *           type: string
 *           nullable: true
 *           description: Additional details about the transaction
 *           example: "Points earned from order #1234"
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the transaction record was created
 *           example: "2025-05-28T14:00:00Z"
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the transaction record was last updated
 *           example: "2025-05-28T15:00:00Z"
 *         customer_id:
 *           type: string
 *           format: uuid
 *           description: UUID of the customer involved in the transaction
 *           example: "a1b2c3d4-5678-90ef-abcd-1234567890ab"
 *         order_id:
 *           type: string
 *           format: uuid
 *           nullable: true
 *           description: UUID of the associated order if applicable
 *           example: "b2c3d4e5-6789-01fa-bcde-234567890abc"
 *         referred_customer_id:
 *           type: string
 *           format: uuid
 *           nullable: true
 *           description: UUID of the referred customer, if this transaction is referral-related
 *           example: "c3d4e5f6-7890-12ab-cdef-34567890abcd"
 */
