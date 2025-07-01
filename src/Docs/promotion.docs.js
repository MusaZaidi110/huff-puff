/**
 * @swagger
 * components:
 *   schemas:
 *     Promotion:
 *       type: object
 *       description: Represents a promotional offer that can be applied to items or provide benefits like free delivery.
 *       required:
 *         - id
 *         - name
 *         - promoType
 *         - startDate
 *         - endDate
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Unique identifier for the promotion.
 *           example: "e7c82858-9091-4bcf-9e8f-1a5ed3b4e63f"

 *         name:
 *           type: string
 *           description: Name of the promotion.
 *           example: "Spring Sale"

 *         description:
 *           type: string
 *           description: Optional description of the promotion.
 *           example: "Enjoy 20% off on all fashion items during our Spring Sale!"

 *         promoType:
 *           type: string
 *           enum: [ITEM_DISCOUNT, FREE_DELIVERY]
 *           description: Type of promotion.
 *           example: "ITEM_DISCOUNT"

 *         discountValue:
 *           type: number
 *           format: decimal
 *           description: The discount amount (can be percentage or fixed value depending on business logic).
 *           example: 20.00

 *         startDate:
 *           type: string
 *           format: date-time
 *           description: The date and time when the promotion starts.
 *           example: "2025-06-01T00:00:00Z"

 *         endDate:
 *           type: string
 *           format: date-time
 *           description: The date and time when the promotion ends.
 *           example: "2025-06-30T23:59:59Z"

 *         isActive:
 *           type: boolean
 *           description: Indicates if the promotion is currently active.
 *           example: true

 *         imageUrl:
 *           type: string
 *           description: Optional image URL used to visually represent the promotion.
 *           example: "https://cdn.example.com/promotions/spring-sale-banner.webp"

 *         showInSlider:
 *           type: boolean
 *           description: Flag to indicate whether the promotion should appear in the homepage slider.
 *           example: true

 *         showInPopup:
 *           type: boolean
 *           description: Flag to indicate whether the promotion should appear as a popup modal.
 *           example: false

 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the promotion was created.
 *           readOnly: true
 *           example: "2025-05-29T12:00:00Z"

 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the promotion was last updated.
 *           readOnly: true
 *           example: "2025-05-30T09:45:00Z"

 *     PromotionItem:
 *       type: object
 *       description: Many-to-many relationship mapping promotions to specific items.
 *       properties:
 *         promotionId:
 *           type: string
 *           format: uuid
 *           description: ID of the promotion.
 *         itemId:
 *           type: string
 *           format: uuid
 *           description: ID of the item associated with the promotion.

 *     PromotionRedemption:
 *       type: object
 *       description: Tracks redemptions or usage logs of a promotion by users.
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         userId:
 *           type: string
 *           format: uuid
 *         promotionId:
 *           type: string
 *           format: uuid
 *         redeemedAt:
 *           type: string
 *           format: date-time
 */
