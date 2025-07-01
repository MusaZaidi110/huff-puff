/**
 * @swagger
 * components:
 *   schemas:
 *     Payment:
 *       type: object
 *       description: Represents a payment made for an order including method, status, and related metadata.
 *       required:
 *         - id
 *         - amount
 *         - payment_method
 *         - payment_intent_id
 *         - status
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Unique identifier for the payment.
 *           example: "ae124ff4-9a2b-4c7a-b9a2-93d2a67c3143"

 *         amount:
 *           type: number
 *           format: decimal
 *           description: Total amount paid.
 *           example: 99.99

 *         payment_method:
 *           type: string
 *           enum: [stripe, google_pay, apple_pay]
 *           description: The method used for payment.
 *           example: "stripe"

 *         payment_intent_id:
 *           type: string
 *           description: Identifier provided by the payment gateway to track the intent.
 *           example: "pi_1GqIC8LYkqyl6XeWb8e0iKQf"

 *         status:
 *           type: string
 *           enum: [pending, completed, failed, refunded]
 *           description: Current status of the payment.
 *           example: "completed"

 *         transaction_id:
 *           type: string
 *           description: Transaction reference ID returned by the payment provider (if available).
 *           example: "txn_1GqIC8LYkqyl6XeWb8e0iKQh"

 *         payment_details:
 *           type: object
 *           description: Raw JSON response from the payment gateway for auditing/debugging.
 *           example:
 *             receipt_email: "customer@example.com"
 *             card_last4: "4242"
 *             currency: "usd"
 *             platform_fee: 2.50

 *         order_id:
 *           type: string
 *           format: uuid
 *           description: The UUID of the associated order.
 *           example: "b15b914f-c893-4952-a730-abc123456def"

 *         created_at:
 *           type: string
 *           format: date-time
 *           readOnly: true
 *           description: Timestamp of when the payment was recorded.
 *           example: "2025-05-30T14:35:22Z"

 *         updated_at:
 *           type: string
 *           format: date-time
 *           readOnly: true
 *           description: Timestamp of the last update to the payment record.
 *           example: "2025-05-30T14:40:00Z"
 * 
 *   parameters:
 *     paymentId:
 *       in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: string
 *         format: uuid
 *       description: UUID of the payment.
 *       example: "ae124ff4-9a2b-4c7a-b9a2-93d2a67c3143"
 */
