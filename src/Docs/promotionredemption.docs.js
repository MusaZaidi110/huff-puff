/**
 * @swagger
 * components:
 *   schemas:
 *     PromotionRedemption:
 *       type: object
 *       description: Records the application (redemption) of a promotion to a specific order.
 *       required:
 *         - id
 *         - orderId
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Unique identifier for the promotion redemption.
 *           example: "ff271f12-355e-4bc3-8f43-3a27643d4d02"
 *
 *         promotionId:
 *           type: string
 *           format: uuid
 *           description: UUID of the associated promotion.
 *           example: "c8f27a34-20d2-49a3-9853-781b6e79d89a"
 *
 *         orderId:
 *           type: string
 *           format: uuid
 *           description: UUID of the order that used the promotion.
 *           example: "a9026ad0-e208-4823-9a88-66a15c048ad1"
 *
 *         discountAmount:
 *           type: number
 *           format: decimal
 *           description: The amount discounted from the order due to the promotion.
 *           example: 15.50
 *
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp of when the promotion was redeemed.
 *           example: "2025-05-30T10:15:00Z"
 *
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp of the last update to the redemption record.
 *           example: "2025-05-30T10:20:00Z"
 */
