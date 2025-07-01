/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       description: Represents a product category grouping multiple items.
 *       required:
 *         - id
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Unique identifier for the category (UUIDv4).
 *           example: "550e8400-e29b-41d4-a716-446655440000"
 *         name:
 *           type: string
 *           description: Name of the category.
 *           example: "Electronics"
 *         description:
 *           type: string
 *           nullable: true
 *           description: Detailed description about the category.
 *           example: "Category for all electronic gadgets and accessories."
 *         image_url:
 *           type: string
 *           nullable: true
 *           format: uri
 *           description: URL of the category image.
 *           example: "https://example.com/images/categories/electronics.jpg"
 *         is_active:
 *           type: boolean
 *           description: Indicates if the category is active and visible.
 *           default: true
 *           example: true
 *         display_order:
 *           type: integer
 *           description: Numeric value indicating the order of category display in lists.
 *           default: 0
 *           example: 1
 *         created_at:
 *           type: string
 *           format: date-time
 *           readOnly: true
 *           description: Timestamp when the category was created.
 *           example: "2023-01-01T12:00:00Z"
 *         updated_at:
 *           type: string
 *           format: date-time
 *           readOnly: true
 *           description: Timestamp when the category was last updated.
 *           example: "2023-01-02T15:00:00Z"
 * 
 *   parameters:
 *     categoryId:
 *       in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: string
 *         format: uuid
 *       description: UUID of the category.
 *       example: "550e8400-e29b-41d4-a716-446655440000"
 */
