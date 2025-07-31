/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: Payment processing and management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Payment:
 *       type: object
 *       required:
 *         - order_id
 *         - amount
 *         - currency
 *         - payment_method
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Auto-generated payment ID
 *         order_id:
 *           type: string
 *           format: uuid
 *           description: Associated order ID
 *         amount:
 *           type: number
 *           format: float
 *           minimum: 0.01
 *           description: Payment amount
 *         currency:
 *           type: string
 *           default: "USD"
 *           description: Currency code (ISO 4217)
 *         payment_method:
 *           type: string
 *           enum: [credit_card, debit_card, paypal, bank_transfer, cash]
 *           description: Payment method used
 *         status:
 *           type: string
 *           enum: [pending, completed, failed, refunded, partially_refunded]
 *           default: "pending"
 *           description: Current payment status
 *         transaction_id:
 *           type: string
 *           description: Payment processor transaction ID
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: When payment was initiated
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Last status update
 *         order:
 *           $ref: '#/components/schemas/Order'
 *         refund:
 *           $ref: '#/components/schemas/Refund'
 *       example:
 *         id: 3fa85f64-5717-4562-b3fc-2c963f66afa6
 *         order_id: 3fa85f64-5717-4562-b3fc-2c963f66afa7
 *         amount: 29.99
 *         currency: "USD"
 *         payment_method: "credit_card"
 *         status: "completed"
 *         transaction_id: "txn_123456789"
 *         created_at: "2023-01-01T12:00:00Z"
 *         updated_at: "2023-01-01T12:05:00Z"

 *     PaymentCreate:
 *       type: object
 *       required:
 *         - order_id
 *         - amount
 *         - payment_method
 *       properties:
 *         order_id:
 *           type: string
 *           format: uuid
 *         amount:
 *           type: number
 *           format: float
 *           minimum: 0.01
 *         currency:
 *           type: string
 *           default: "USD"
 *         payment_method:
 *           type: string
 *           enum: [credit_card, debit_card, paypal, bank_transfer, cash]
 *       example:
 *         order_id: 3fa85f64-5717-4562-b3fc-2c963f66afa7
 *         amount: 29.99
 *         currency: "USD"
 *         payment_method: "credit_card"

 *     PaymentComplete:
 *       type: object
 *       required:
 *         - transactionId
 *       properties:
 *         transactionId:
 *           type: string
 *           description: Payment processor transaction ID
 *       example:
 *         transactionId: "txn_123456789"

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
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: When refund was processed
 *       example:
 *         id: 3fa85f64-5717-4562-b3fc-2c963f66afa6
 *         payment_id: 3fa85f64-5717-4562-b3fc-2c963f66afa7
 *         amount: 29.99
 *         reason: "Customer request"
 *         created_at: "2023-01-02T10:00:00Z"

 *     RefundRequest:
 *       type: object
 *       required:
 *         - amount
 *       properties:
 *         amount:
 *           type: number
 *           format: float
 *           minimum: 0.01
 *         reason:
 *           type: string
 *       example:
 *         amount: 29.99
 *         reason: "Customer request"

 *     ErrorResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 */

/**
 * @swagger
 * /payments:
 *   post:
 *     summary: Create a payment record
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PaymentCreate'
 *     responses:
 *       201:
 *         description: Payment record created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
 *       400:
 *         description: Invalid request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /payments/{id}:
 *   get:
 *     summary: Get payment by ID
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Payment ID
 *     responses:
 *       200:
 *         description: Payment details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
 *       404:
 *         description: Payment not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /payments:
 *   get:
 *     summary: Get filtered payments
 *     tags: [Payments]
 *     parameters:
 *       - in: query
 *         name: orderId
 *         schema:
 *           type: string
 *         description: Filter by order ID
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, completed, failed, refunded, partially_refunded]
 *         description: Filter by payment status
 *       - in: query
 *         name: method
 *         schema:
 *           type: string
 *           enum: [credit_card, debit_card, paypal, bank_transfer, cash]
 *         description: Filter by payment method
 *       - in: query
 *         name: fromDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter payments after this date (YYYY-MM-DD)
 *       - in: query
 *         name: toDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter payments before this date (YYYY-MM-DD)
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
 *         description: List of payments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Payment'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /payments/{id}/complete:
 *   put:
 *     summary: Mark payment as completed (webhook)
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Payment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PaymentComplete'
 *     responses:
 *       200:
 *         description: Payment marked as completed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
 *       400:
 *         description: Invalid request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Payment not found
 */

/**
 * @swagger
 * /payments/{id}/fail:
 *   put:
 *     summary: Mark payment as failed (webhook)
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Payment ID
 *     responses:
 *       200:
 *         description: Payment marked as failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
 *       400:
 *         description: Invalid request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Payment not found
 */

/**
 * @swagger
 * /payments/{id}/refunds:
 *   post:
 *     summary: Process a refund
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Payment ID to refund
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RefundRequest'
 *     responses:
 *       201:
 *         description: Refund processed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Refund'
 *       400:
 *         description: Cannot process refund
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Payment not found
 */