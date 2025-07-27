/**
 * @swagger
 * tags:
 *   - name: Branch Deals
 *     description: Management of deals specific to branches
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     BranchDeal:
 *       type: object
 *       required:
 *         - branch_id
 *         - deal_id
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "550e8400-e29b-41d4-a716-446655440000"
 *         branch_id:
 *           type: string
 *           format: uuid
 *           example: "660e8400-e29b-41d4-a716-446655440000"
 *         deal_id:
 *           type: string
 *           format: uuid
 *           example: "770e8400-e29b-41d4-a716-446655440000"
 *         is_active:
 *           type: boolean
 *           default: true
 *           example: true
 *         display_order:
 *           type: integer
 *           minimum: 0
 *           default: 0
 *           example: 1
 *         start_date:
 *           type: string
 *           format: date-time
 *           example: "2024-06-01T00:00:00Z"
 *         end_date:
 *           type: string
 *           format: date-time
 *           example: "2024-06-30T23:59:59Z"
 *         created_at:
 *           type: string
 *           format: date-time
 *           example: "2024-05-01T12:00:00Z"
 *         updated_at:
 *           type: string
 *           format: date-time
 *           example: "2024-05-15T09:30:00Z"
 *         deal:
 *           $ref: '#/components/schemas/Deal'
 * 
 *     Deal:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "770e8400-e29b-41d4-a716-446655440000"
 *         name:
 *           type: string
 *           example: "Summer Special"
 *         description:
 *           type: string
 *           example: "Special discount for summer season"
 *         price:
 *           type: number
 *           format: float
 *           example: 19.99
 *         discount_percentage:
 *           type: number
 *           format: float
 *           example: 15.0
 *         image_url:
 *           type: string
 *           example: "https://example.com/images/summer-special.jpg"
 * 
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           example: "Branch deal not found"
 */

/**
 * @swagger
 * /branch-deals:
 *   post:
 *     summary: Add a deal to a branch (Admin only)
 *     tags: [Branch Deals]
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
 *               - deal_id
 *             properties:
 *               branch_id:
 *                 type: string
 *                 format: uuid
 *                 example: "660e8400-e29b-41d4-a716-446655440000"
 *               deal_id:
 *                 type: string
 *                 format: uuid
 *                 example: "770e8400-e29b-41d4-a716-446655440000"
 *               is_active:
 *                 type: boolean
 *                 example: true
 *               display_order:
 *                 type: integer
 *                 example: 1
 *               start_date:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-06-01T00:00:00Z"
 *               end_date:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-06-30T23:59:59Z"
 *     responses:
 *       201:
 *         description: Deal successfully added to branch
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BranchDeal'
 *       400:
 *         description: Invalid request data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /branch-deals/branch/{branchId}:
 *   get:
 *     summary: Get active deals for a branch
 *     tags: [Branch Deals]
 *     parameters:
 *       - in: path
 *         name: branchId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         example: "660e8400-e29b-41d4-a716-446655440000"
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         description: Date to check for active deals (defaults to current date)
 *         example: "2024-06-15"
 *     responses:
 *       200:
 *         description: List of active deals for the branch
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BranchDeal'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /branch-deals/{id}:
 *   put:
 *     summary: Update a branch deal (Admin only)
 *     tags: [Branch Deals]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         example: "550e8400-e29b-41d4-a716-446655440000"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               is_active:
 *                 type: boolean
 *                 example: true
 *               display_order:
 *                 type: integer
 *                 example: 2
 *               start_date:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-06-01T00:00:00Z"
 *               end_date:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-06-30T23:59:59Z"
 *     responses:
 *       200:
 *         description: Branch deal updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BranchDeal'
 *       400:
 *         description: Invalid request data
 *       404:
 *         description: Branch deal not found
 * 
 *   delete:
 *     summary: Remove a deal from branch (Admin only)
 *     tags: [Branch Deals]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         example: "550e8400-e29b-41d4-a716-446655440000"
 *     responses:
 *       200:
 *         description: Deal removed from branch successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Deal removed from branch successfully"
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Branch deal not found
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