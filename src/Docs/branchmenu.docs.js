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

/**
 * @swagger
 * tags:
 *   - name: Branch Menu
 *     description: Management of menu items specific to branches
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     BranchMenuItem:
 *       type: object
 *       required:
 *         - branch_id
 *         - item_id
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "550e8400-e29b-41d4-a716-446655440000"
 *         branch_id:
 *           type: string
 *           format: uuid
 *           example: "660e8400-e29b-41d4-a716-446655440000"
 *         item_id:
 *           type: string
 *           format: uuid
 *           example: "880e8400-e29b-41d4-a716-446655440000"
 *         price_override:
 *           type: number
 *           format: float
 *           example: 12.99
 *         is_available:
 *           type: boolean
 *           default: true
 *           example: true
 *         display_order:
 *           type: integer
 *           minimum: 0
 *           example: 1
 *         created_at:
 *           type: string
 *           format: date-time
 *           example: "2024-05-01T12:00:00Z"
 *         updated_at:
 *           type: string
 *           format: date-time
 *           example: "2024-05-15T09:30:00Z"
 *         item:
 *           $ref: '#/components/schemas/MenuItem'
 *
 *     MenuItem:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "880e8400-e29b-41d4-a716-446655440000"
 *         name:
 *           type: string
 *           example: "Margherita Pizza"
 *         description:
 *           type: string
 *           example: "Classic pizza with tomato sauce and mozzarella"
 *         base_price:
 *           type: number
 *           format: float
 *           example: 10.99
 *         image_url:
 *           type: string
 *           example: "https://example.com/images/margherita.jpg"
 *         category_id:
 *           type: string
 *           format: uuid
 *           example: "990e8400-e29b-41d4-a716-446655440000"
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           example: "Menu item not found in this branch"
 */

/**
 * @swagger
 * /branch-menu:
 *   post:
 *     summary: Add or update menu item in branch (Manager/Admin only)
 *     tags: [Branch Menu]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - branch_id
 *               - item_id
 *             properties:
 *               branch_id:
 *                 type: string
 *                 format: uuid
 *                 example: "660e8400-e29b-41d4-a716-446655440000"
 *               item_id:
 *                 type: string
 *                 format: uuid
 *                 example: "880e8400-e29b-41d4-a716-446655440000"
 *               price_override:
 *                 type: number
 *                 format: float
 *                 example: 12.99
 *               is_available:
 *                 type: boolean
 *                 example: true
 *               display_order:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Menu item successfully added/updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BranchMenuItem'
 *       400:
 *         description: Invalid request data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /branch-menu/branch/{branchId}:
 *   get:
 *     summary: Get branch menu
 *     tags: [Branch Menu]
 *     parameters:
 *       - in: path
 *         name: branchId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         example: "660e8400-e29b-41d4-a716-446655440000"
 *       - in: query
 *         name: available
 *         schema:
 *           type: boolean
 *         description: Filter by availability (default true)
 *         example: true
 *     responses:
 *       200:
 *         description: Branch menu items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BranchMenuItem'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /branch-menu/{branchId}/items/{itemId}/toggle:
 *   patch:
 *     summary: Toggle menu item availability (Manager/Admin only)
 *     tags: [Branch Menu]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: branchId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         example: "660e8400-e29b-41d4-a716-446655440000"
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         example: "880e8400-e29b-41d4-a716-446655440000"
 *     responses:
 *       200:
 *         description: Menu item availability toggled
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BranchMenuItem'
 *       400:
 *         description: Invalid request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Menu item not found in branch
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
