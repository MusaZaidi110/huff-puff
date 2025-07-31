/**
 * @swagger
 * tags:
 *   name: Refunds
 *   description: Refund processing and management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Refund:
 *       type: object
 *       required:
 *         - payment_id
 *         - amount
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Auto-generated refund ID
 *         payment_id:
 *           type: string
 *           format: uuid
 *           description: Original payment ID
 *         amount:
 *           type: number
 *           format: float
 *           minimum: 0.01
 *           description: Refund amount
 *         reason:
 *           type: string
 *           description: Reason for refund
 *         status:
 *           type: string
 *           enum: [pending, completed, failed]
 *           default: "pending"
 *           description: Current refund status
 *         refund_id:
 *           type: string
 *           description: Payment processor's refund ID
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: When refund was initiated
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Last status update
 *         payment:
 *           $ref: '#/components/schemas/Payment'
 *       example:
 *         id: 3fa85f64-5717-4562-b3fc-2c963f66afa6
 *         payment_id: 3fa85f64-5717-4562-b3fc-2c963f66afa7
 *         amount: 29.99
 *         reason: "Customer request"
 *         status: "completed"
 *         refund_id: "re_123456789"
 *         created_at: "2023-01-01T12:00:00Z"
 *         updated_at: "2023-01-01T12:05:00Z"

 *     RefundComplete:
 *       type: object
 *       required:
 *         - refundId
 *       properties:
 *         refundId:
 *           type: string
 *           description: Payment processor's refund ID
 *       example:
 *         refundId: "re_123456789"

 *     ErrorResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 */

/**
 * @swagger
 * /refund/{id}:
 *   get:
 *     summary: Get refund by ID
 *     tags: [Refunds]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Refund ID
 *     responses:
 *       200:
 *         description: Refund details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Refund'
 *       404:
 *         description: Refund not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /refund:
 *   get:
 *     summary: Get filtered refunds
 *     tags: [Refunds]
 *     parameters:
 *       - in: query
 *         name: paymentId
 *         schema:
 *           type: string
 *         description: Filter by payment ID
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, completed, failed]
 *         description: Filter by refund status
 *       - in: query
 *         name: fromDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter refunds after this date (YYYY-MM-DD)
 *       - in: query
 *         name: toDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter refunds before this date (YYYY-MM-DD)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 100
 *         description: Pagination limit
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Pagination offset
 *     responses:
 *       200:
 *         description: List of refunds
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Refund'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /refund/{id}/complete:
 *   put:
 *     summary: Mark refund as completed (webhook)
 *     tags: [Refunds]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Refund ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RefundComplete'
 *     responses:
 *       200:
 *         description: Refund marked as completed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Refund'
 *       400:
 *         description: Invalid request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Refund not found
 */

/**
 * @swagger
 * /refund/{id}/fail:
 *   put:
 *     summary: Mark refund as failed (webhook)
 *     tags: [Refunds]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Refund ID
 *     responses:
 *       200:
 *         description: Refund marked as failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Refund'
 *       400:
 *         description: Invalid request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Refund not found
 */