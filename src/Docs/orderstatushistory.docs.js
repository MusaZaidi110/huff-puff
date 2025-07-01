/**
 * @swagger
 * components:
 *   schemas:
 *     OrderStatusHistory:
 *       type: object
 *       description: Represents the historical status changes of an order, tracking who updated the status and when.
 *       required:
 *         - id
 *         - status
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Unique identifier for the order status history entry.
 *           example: "a1b2c3d4-e5f6-7890-ab12-3456789cdef0"
 *         
 *         status:
 *           type: string
 *           enum: [pending, accepted, preparing, ready, out_for_delivery, delivered, cancelled]
 *           description: The order status at a specific point in time.
 *           example: "out_for_delivery"
 *         
 *         notes:
 *           type: string
 *           description: Optional notes or reason for status change.
 *           example: "Order handed to delivery person"
 *         
 *         order_id:
 *           type: string
 *           format: uuid
 *           description: UUID of the associated order.
 *           example: "5d432a9e-b6a1-4cf4-92e2-c9b123456789"
 *         
 *         staff_id:
 *           type: string
 *           format: uuid
 *           description: UUID of the staff member who updated the status (if applicable).
 *           example: "3f2e4d5c-a2b1-4567-8123-a456def12345"
 *         
 *         delivery_person_id:
 *           type: string
 *           format: uuid
 *           description: UUID of the delivery person who updated the status (if applicable).
 *           example: "9b123ef4-678c-4de1-a234-f456bcdef789"
 *         
 *         created_at:
 *           type: string
 *           format: date-time
 *           readOnly: true
 *           description: Timestamp when the status was recorded.
 *           example: "2025-05-30T08:30:00Z"
 *         
 *         updated_at:
 *           type: string
 *           format: date-time
 *           readOnly: true
 *           description: Timestamp of the last update.
 *           example: "2025-05-30T08:45:00Z"
 * 
 *   parameters:
 *     orderStatusHistoryId:
 *       in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: string
 *         format: uuid
 *       description: UUID of the order status history record.
 *       example: "a1b2c3d4-e5f6-7890-ab12-3456789cdef0"
 */
