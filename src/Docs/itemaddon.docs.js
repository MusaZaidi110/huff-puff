/**
 * @swagger
 * components:
 *   schemas:
 *     ItemAddon:
 *       type: object
 *       description: Represents an optional add-on or extra for an item, such as toppings or side dishes.
 *       required:
 *         - id
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Unique identifier for the item addon (UUIDv4).
 *           example: "550e8400-e29b-41d4-a716-446655440000"
 *         name:
 *           type: string
 *           description: Name of the addon.
 *           example: "Extra Cheese"
 *         price:
 *           type: number
 *           format: double
 *           description: Additional price for this addon.
 *           default: 0
 *           example: 1.50
 *         is_active:
 *           type: boolean
 *           description: Indicates if the addon is currently active and available.
 *           default: true
 *           example: true
 *         created_at:
 *           type: string
 *           format: date-time
 *           readOnly: true
 *           description: Timestamp when the addon was created.
 *           example: "2023-01-01T12:00:00Z"
 *         updated_at:
 *           type: string
 *           format: date-time
 *           readOnly: true
 *           description: Timestamp when the addon was last updated.
 *           example: "2023-01-02T15:00:00Z"
 *         item_id:
 *           type: string
 *           format: uuid
 *           nullable: true
 *           description: UUID of the item this addon belongs to.
 *           example: "a1234567-e29b-41d4-a716-446655440000"
 *
 *   parameters:
 *     itemAddonId:
 *       in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: string
 *         format: uuid
 *       description: UUID of the item addon.
 *       example: "550e8400-e29b-41d4-a716-446655440000"
 */
