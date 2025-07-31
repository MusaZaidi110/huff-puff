/**
 * @swagger
 * tags:
 *   name: Order Status History
 *   description: Tracking of order status changes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     OrderStatusHistory:
 *       type: object
 *       required:
 *         - order_id
 *         - status
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Auto-generated history entry ID
 *         order_id:
 *           type: string
 *           format: uuid
 *           description: Related order ID
 *         status:
 *           type: string
 *           enum: [pending, accepted, preparing, ready, out_for_delivery, delivered, cancelled]
 *           description: Order status at this point in history
 *         staff_id:
 *           type: string
 *           format: uuid
 *           description: ID of staff member who changed status
 *         notes:
 *           type: string
 *           description: Additional notes about the status change
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: When the status change occurred
 *       example:
 *         id: 3fa85f64-5717-4562-b3fc-2c963f66afa6
 *         order_id: 3fa85f64-5717-4562-b3fc-2c963f66afa7
 *         status: preparing
 *         staff_id: 3fa85f64-5717-4562-b3fc-2c963f66afa8
 *         notes: "Started food preparation"
 *         created_at: "2023-01-01T12:00:00Z"

 *     StatusHistoryCreate:
 *       type: object
 *       required:
 *         - status
 *       properties:
 *         status:
 *           type: string
 *           enum: [pending, accepted, preparing, ready, out_for_delivery, delivered, cancelled]
 *         staff_id:
 *           type: string
 *           format: uuid
 *         notes:
 *           type: string
 *       example:
 *         status: preparing
 *         staff_id: 3fa85f64-5717-4562-b3fc-2c963f66afa8
 *         notes: "Started food preparation"

 *     ErrorResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 */

/**
 * @swagger
 * /order-status-history/{orderId}/history:
 *   get:
 *     summary: Get status history for an order
 *     tags: [Order Status History]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the order to get history for
 *     responses:
 *       200:
 *         description: List of status history entries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/OrderStatusHistory'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /order-status-history/{orderId}/history:
 *   post:
 *     summary: Add status entry to order history
 *     tags: [Order Status History]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the order to add history to
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StatusHistoryCreate'
 *     responses:
 *       201:
 *         description: Status history entry created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderStatusHistory'
 *       400:
 *         description: Invalid request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */