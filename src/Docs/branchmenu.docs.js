/**
 * @swagger
 * components:
 *   schemas:
 *     BranchMenu:
 *       type: object
 *       required:
 *         - id
 *         - branch_id
 *         - item_id
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Unique identifier for the BranchMenu entry (UUIDv4)
 *           example: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
 *         branch_id:
 *           type: string
 *           format: uuid
 *           description: Foreign key referencing the Branch this menu item belongs to
 *           example: "d290f1ee-6c54-4b01-90e6-d701748f0851"
 *         item_id:
 *           type: string
 *           format: uuid
 *           description: Foreign key referencing the Item that is available in this branch menu
 *           example: "e2a1b3c5-7d4a-4f25-b734-90c9b6c3f55b"
 *         is_available:
 *           type: boolean
 *           description: Indicates if the menu item is currently available at this branch
 *           default: true
 *           example: true
 *         special_price:
 *           type: string
 *           format: decimal
 *           description: Special price for the item at this branch, if applicable
 *           example: "9.99"
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Timestamp when this branch menu entry was created
 *           example: "2024-05-27T12:00:00Z"
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Timestamp when this branch menu entry was last updated
 *           example: "2024-05-28T15:30:00Z"
 */
