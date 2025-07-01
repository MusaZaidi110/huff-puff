/**
 * @swagger
 * components:
 *   schemas:
 *     ItemVariant:
 *       type: object
 *       description: Represents a variant or option for an item, such as size or flavor, with an optional price adjustment.
 *       required:
 *         - id
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Unique identifier for the item variant (UUIDv4).
 *           example: "550e8400-e29b-41d4-a716-446655440000"
 *         name:
 *           type: string
 *           description: Name of the variant (e.g., "Small", "Large", "Vanilla").
 *           example: "Large"
 *         price_adjustment:
 *           type: number
 *           format: double
 *           description: Price difference compared to the base item price. Can be positive or negative.
 *           default: 0
 *           example: 2.50
 *         is_active:
 *           type: boolean
 *           description: Indicates if the variant is currently active and available.
 *           default: true
 *           example: true
 *         created_at:
 *           type: string
 *           format: date-time
 *           readOnly: true
 *           description: Timestamp when the variant was created.
 *           example: "2023-01-01T12:00:00Z"
 *         updated_at:
 *           type: string
 *           format: date-time
 *           readOnly: true
 *           description: Timestamp when the variant was last updated.
 *           example: "2023-01-02T15:00:00Z"
 *         item_id:
 *           type: string
 *           format: uuid
 *           nullable: true
 *           description: UUID of the item this variant belongs to.
 *           example: "a1234567-e29b-41d4-a716-446655440000"
 * 
 *   parameters:
 *     itemVariantId:
 *       in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: string
 *         format: uuid
 *       description: UUID of the item variant.
 *       example: "550e8400-e29b-41d4-a716-446655440000"
 */
