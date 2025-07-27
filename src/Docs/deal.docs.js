/**
 * @swagger
 * components:
 *   schemas:
 *     Deal:
 *       type: object
 *       required:
 *         - name
 *         - price
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Unique identifier for the deal (UUIDv4)
 *           example: "d290f1ee-6c54-4b01-90e6-d701748f0851"
 *         name:
 *           type: string
 *           description: Name of the deal
 *           example: "Summer Special Combo"
 *         description:
 *           type: string
 *           description: Detailed description of the deal
 *           example: "Includes 2 large pizzas, garlic bread, and a 2L soda"
 *         price:
 *           type: number
 *           format: decimal
 *           description: Original price of the deal
 *           example: 29.99
 *         image_url:
 *           type: string
 *           description: URL of the deal image
 *           example: "https://example.com/images/summer-special.jpg"
 *         discount_percentage:
 *           type: number
 *           format: decimal
 *           description: Discount percentage applied (0-100)
 *           minimum: 0
 *           maximum: 100
 *           default: 0
 *           example: 15.5
 *         is_active:
 *           type: boolean
 *           description: Whether the deal is currently active
 *           default: true
 *           example: true
 *         valid_from:
 *           type: string
 *           format: date-time
 *           description: Date when the deal becomes valid
 *           example: "2024-06-01T00:00:00Z"
 *         valid_to:
 *           type: string
 *           format: date-time
 *           description: Date when the deal expires
 *           example: "2024-08-31T23:59:59Z"
 *         min_selections:
 *           type: integer
 *           description: Minimum number of items that must be selected
 *           default: 1
 *           example: 1
 *         max_selections:
 *           type: integer
 *           description: Maximum number of items that can be selected (null for unlimited)
 *           example: 5
 *         category_id:
 *           type: string
 *           format: uuid
 *           description: Reference to the category this deal belongs to
 *           example: "c3f1ee-6c54-4b01-90e6-d701748f0852"
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the deal was created
 *           example: "2024-05-27T12:00:00Z"
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the deal was last updated
 *           example: "2024-05-28T15:30:00Z"
 *       example:
 *         id: "d290f1ee-6c54-4b01-90e6-d701748f0851"
 *         name: "Summer Special Combo"
 *         description: "Includes 2 large pizzas, garlic bread, and a 2L soda"
 *         price: 29.99
 *         image_url: "https://example.com/images/summer-special.jpg"
 *         discount_percentage: 15.5
 *         is_active: true
 *         valid_from: "2024-06-01T00:00:00Z"
 *         valid_to: "2024-08-31T23:59:59Z"
 *         min_selections: 1
 *         max_selections: 5
 *         category_id: "c3f1ee-6c54-4b01-90e6-d701748f0852"
 *         created_at: "2024-05-27T12:00:00Z"
 *         updated_at: "2024-05-28T15:30:00Z"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     DealRelationships:
 *       type: object
 *       description: Relationship definitions for Deal model
 *       properties:
 *         associations:
 *           type: object
 *           properties:
 *             Category:
 *               type: string
 *               description: The category this deal belongs to (via category_id)
 *             DealItems:
 *               type: array
 *               description: List of items included in this deal
 *               items:
 *                 $ref: '#/components/schemas/DealItem'
 *             Branches:
 *               type: array
 *               description: Branches where this deal is available
 *               items:
 *                 $ref: '#/components/schemas/Branch'
 *       example:
 *         associations:
 *           Category: "Pizza Combos"
 *           DealItems: 
 *             - { item_id: "i290f1ee-6c54-4b01-90e6-d701748f0851", quantity: 2 }
 *             - { item_id: "i390f1ee-6c54-4b01-90e6-d701748f0852", quantity: 1 }
 *           Branches:
 *             - { id: "b290f1ee-6c54-4b01-90e6-d701748f0851", name: "Downtown Branch" }
 *             - { id: "b390f1ee-6c54-4b01-90e6-d701748f0852", name: "Uptown Branch" }
 */