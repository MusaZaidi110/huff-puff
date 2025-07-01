/**
 * @swagger
 * components:
 *   schemas:
 *     Refund:
 *       type: object
 *       description: Represents a refund transaction associated with a specific payment.
 *       required:
 *         - id
 *         - amount
 *         - status
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Unique identifier for the refund.
 *           example: "6f7c2d3b-d9a3-487c-b8b4-93e1cbb4d345"

 *         amount:
 *           type: number
 *           format: decimal
 *           description: Amount that was refunded.
 *           example: 49.99

 *         reason:
 *           type: string
 *           description: Optional explanation for the refund.
 *           example: "Customer requested refund due to incorrect order."

 *         status:
 *           type: string
 *           enum: [pending, completed, failed]
 *           description: The current status of the refund.
 *           example: "completed"

 *         refund_id:
 *           type: string
 *           description: Identifier from the payment provider for this refund.
 *           example: "re_1HcX1n2eZvKYlo2CbYJ0aIYX"

 *         payment_id:
 *           type: string
 *           format: uuid
 *           description: Foreign key referencing the related Payment.
 *           example: "de4f78a7-345b-4a14-9e84-5fa1ac93c887"

 *         created_at:
 *           type: string
 *           format: date-time
 *           readOnly: true
 *           description: Timestamp when the refund record was created.
 *           example: "2025-05-30T10:15:00Z"

 *         updated_at:
 *           type: string
 *           format: date-time
 *           readOnly: true
 *           description: Timestamp when the refund record was last updated.
 *           example: "2025-05-30T10:30:00Z"

 *   parameters:
 *     refundId:
 *       in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: string
 *         format: uuid
 *       description: UUID of the refund.
 *       example: "6f7c2d3b-d9a3-487c-b8b4-93e1cbb4d345"
 */
