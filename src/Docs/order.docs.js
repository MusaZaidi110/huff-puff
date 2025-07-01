/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       description: Represents a customer order with details including payment, status, and promotions.
 *       required:
 *         - id
 *         - order_type
 *         - subtotal
 *         - tax
 *         - total_amount
 *         - customer_id
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Unique identifier for the order (UUIDv4).
 *           example: "550e8400-e29b-41d4-a716-446655440000"
 *         order_type:
 *           type: string
 *           enum:
 *             - delivery
 *             - pickup
 *           description: Type of order (delivery or pickup).
 *           example: "delivery"
 *         status:
 *           type: string
 *           enum:
 *             - pending
 *             - preparing
 *             - ready
 *             - out_for_delivery
 *             - delivered
 *             - cancelled
 *           description: Current status of the order.
 *           default: "pending"
 *           example: "preparing"
 *         subtotal:
 *           type: string
 *           format: decimal
 *           description: Subtotal amount before tax, delivery fee, and discounts.
 *           example: "50.00"
 *         tax:
 *           type: string
 *           format: decimal
 *           description: Tax amount applied to the order.
 *           example: "5.00"
 *         delivery_fee:
 *           type: string
 *           format: decimal
 *           description: Delivery fee charged for the order.
 *           default: "0.00"
 *           example: "3.50"
 *         discount_amount:
 *           type: string
 *           format: decimal
 *           description: Total discount applied to the order.
 *           default: "0.00"
 *           example: "10.00"
 *         total_amount:
 *           type: string
 *           format: decimal
 *           description: Final total amount after tax, delivery fee, and discounts.
 *           example: "48.50"
 *         estimated_delivery_time:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           description: Estimated delivery time for the order.
 *           example: "2025-05-29T18:30:00Z"
 *         order_notes:
 *           type: string
 *           nullable: true
 *           description: Additional notes provided by the customer.
 *           example: "Please ring the doorbell twice."
 *         payment_method:
 *           type: string
 *           enum:
 *             - stripe
 *             - google_pay
 *             - apple_pay
 *           nullable: true
 *           description: Payment method used for the order.
 *           example: "stripe"
 *         payment_status:
 *           type: string
 *           enum:
 *             - pending
 *             - completed
 *             - failed
 *             - refunded
 *           description: Status of the payment.
 *           default: "pending"
 *           example: "completed"
 *         promotionId:
 *           type: string
 *           format: uuid
 *           nullable: true
 *           description: UUID of the applied promotion.
 *           example: "d290f1ee-6c54-4b01-90e6-d701748f0851"
 *         promoCodeUsed:
 *           type: string
 *           nullable: true
 *           description: Promotional code applied by the customer.
 *           example: "SPRINGSALE20"
 *         promotionDiscount:
 *           type: string
 *           format: decimal
 *           nullable: true
 *           description: Discount amount from the applied promotion.
 *           example: "5.00"
 *         loyalty_points_earned:
 *           type: integer
 *           description: Number of loyalty points earned from this order.
 *           default: 0
 *           example: 10
 *         loyalty_points_redeemed:
 *           type: integer
 *           description: Number of loyalty points redeemed on this order.
 *           default: 0
 *           example: 5
 *         customer_id:
 *           type: string
 *           format: uuid
 *           description: UUID of the customer who placed the order.
 *           example: "b123f1ee-6c54-4b01-90e6-d701748f5678"
 *         pickup_time:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           description: Scheduled pickup time for the order.
 *           example: "2025-05-30T12:00:00Z"
 *         delivery_started_at:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           description: Timestamp when the delivery started.
 *           example: "2025-05-29T18:00:00Z"
 *         delivered_at:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           description: Timestamp when the order was delivered.
 *           example: "2025-05-29T18:45:00Z"
 *         special_delivery_instructions:
 *           type: string
 *           nullable: true
 *           description: Special instructions for delivery personnel.
 *           example: "Leave the package at the back door."
 *         created_at:
 *           type: string
 *           format: date-time
 *           readOnly: true
 *           description: Timestamp when the order was created.
 *           example: "2025-05-29T17:45:00Z"
 *         updated_at:
 *           type: string
 *           format: date-time
 *           readOnly: true
 *           description: Timestamp when the order was last updated.
 *           example: "2025-05-29T18:10:00Z"
 * 
 *   parameters:
 *     orderId:
 *       in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: string
 *         format: uuid
 *       description: UUID of the order.
 *       example: "550e8400-e29b-41d4-a716-446655440000"
 */
