/**
 * @swagger
 * components:
 *   schemas:
 *     OrderItemAddon:
 *       type: object
 *       description: Represents an addon associated with an order item, including quantity and price.
 *       required:
 *         - id
 *         - unit_price
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Unique identifier for the order item addon (UUIDv4).
 *           example: "f47ac10b-58cc-4372-a567-0e02b2c3d479"
 *         quantity:
 *           type: integer
 *           description: Quantity of the addon added to the order item.
 *           default: 1
 *           example: 2
 *         unit_price:
 *           type: string
 *           format: decimal
 *           description: Price per unit of this addon.
 *           example: "3.50"
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the order item addon was created.
 *           readOnly: true
 *           example: "2025-05-29T13:00:00Z"
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the order item addon was last updated.
 *           readOnly: true
 *           example: "2025-05-29T13:10:00Z"
 * 
 *   parameters:
 *     orderItemAddonId:
 *       in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: string
 *         format: uuid
 *       description: UUID of the order item addon.
 *       example: "f47ac10b-58cc-4372-a567-0e02b2c3d479"
 */
