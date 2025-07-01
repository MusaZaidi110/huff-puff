/**
 * @swagger
 * components:
 *   schemas:
 *     PromotionItem:
 *       type: object
 *       description: Join table representing the many-to-many relationship between promotions and items.
 *       required:
 *         - promotionId
 *         - itemId
 *       properties:
 *         promotionId:
 *           type: string
 *           format: uuid
 *           description: UUID of the associated promotion.
 *           example: "d8f59b4c-0c95-4fbd-b8d9-94e3133cb9f5"

 *         itemId:
 *           type: string
 *           format: uuid
 *           description: UUID of the associated item.
 *           example: "b1b5794d-06ab-4e1d-81d5-2a02a4cbbf22"
 */
