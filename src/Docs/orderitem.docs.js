/**
 * @swagger
 * components:
 *   schemas:
 *     OrderItem:
 *       type: object
 *       description: Represents an individual item in an order, including quantity, pricing, and special instructions.
 *       required:
 *         - id
 *         - quantity
 *         - unit_price
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Unique identifier for the order item (UUIDv4).
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *         quantity:
 *           type: integer
 *           description: Quantity of this item ordered.
 *           default: 1
 *           example: 2
 *         unit_price:
 *           type: string
 *           format: decimal
 *           description: Price per unit of this item.
 *           example: "15.99"
 *         special_instructions:
 *           type: string
 *           nullable: true
 *           description: Any special instructions or notes for this item.
 *           example: "No onions, please."
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the order item was created.
 *           readOnly: true
 *           example: "2025-05-29T12:30:00Z"
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the order item was last updated.
 *           readOnly: true
 *           example: "2025-05-29T12:45:00Z"
 * 
 *   parameters:
 *     orderItemId:
 *       in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: string
 *         format: uuid
 *       description: UUID of the order item.
 *       example: "123e4567-e89b-12d3-a456-426614174000"
 */
