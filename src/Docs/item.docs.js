/**
 * @swagger
 * components:
 *   schemas:
 *     Item:
 *       type: object
 *       description: Represents a product or menu item available in the system.
 *       required:
 *         - id
 *         - name
 *         - price
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Unique identifier for the item (UUIDv4).
 *           example: "550e8400-e29b-41d4-a716-446655440000"
 *         name:
 *           type: string
 *           description: Name of the item.
 *           example: "Margherita Pizza"
 *         description:
 *           type: string
 *           nullable: true
 *           description: Detailed description of the item.
 *           example: "Classic Margherita pizza with fresh basil and mozzarella cheese."
 *         price:
 *           type: number
 *           format: double
 *           description: Price of the item.
 *           example: 9.99
 *         image_url:
 *           type: string
 *           nullable: true
 *           format: uri
 *           description: URL of the item's image.
 *           example: "https://example.com/images/items/margherita-pizza.jpg"
 *         is_vegetarian:
 *           type: boolean
 *           description: Indicates whether the item is vegetarian.
 *           default: false
 *           example: true
 *         preparation_time:
 *           type: integer
 *           nullable: true
 *           description: Preparation time in minutes.
 *           example: 15
 *         is_active:
 *           type: boolean
 *           description: Indicates if the item is active and available for order.
 *           default: true
 *           example: true
 *         created_at:
 *           type: string
 *           format: date-time
 *           readOnly: true
 *           description: Timestamp when the item was created.
 *           example: "2023-01-01T12:00:00Z"
 *         updated_at:
 *           type: string
 *           format: date-time
 *           readOnly: true
 *           description: Timestamp when the item was last updated.
 *           example: "2023-01-02T15:00:00Z"
 *         category_id:
 *           type: string
 *           format: uuid
 *           nullable: true
 *           description: UUID of the category this item belongs to.
 *           example: "a1234567-e29b-41d4-a716-446655440000"
 * 
 *   parameters:
 *     itemId:
 *       in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: string
 *         format: uuid
 *       description: UUID of the item.
 *       example: "550e8400-e29b-41d4-a716-446655440000"
 */
