/**
 * @swagger
 * components:
 *   schemas:
 *     PushNotification:
 *       type: object
 *       description: Represents a push notification sent to a user.
 *       required:
 *         - id
 *         - title
 *         - body
 *         - notification_type
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Unique identifier for the push notification (UUIDv4).
 *           example: "550e8400-e29b-41d4-a716-446655440000"
 *         title:
 *           type: string
 *           description: Title of the push notification.
 *           example: "Order Shipped"
 *         body:
 *           type: string
 *           description: Body content of the notification message.
 *           example: "Your order #12345 has been shipped."
 *         data:
 *           type: object
 *           description: Additional JSON data sent with the notification.
 *           example: { "orderId": "12345", "status": "shipped" }
 *         is_read:
 *           type: boolean
 *           description: Indicates whether the notification has been read by the user.
 *           default: false
 *           example: false
 *         notification_type:
 *           type: string
 *           enum:
 *             - order_update
 *             - promotion
 *             - event
 *             - system
 *           description: Type/category of the notification.
 *           example: "order_update"
 *         related_id:
 *           type: string
 *           format: uuid
 *           nullable: true
 *           description: Optional UUID related to the notification (e.g., order ID, promotion ID).
 *           example: "a1234567-e29b-41d4-a716-446655440000"
 *         user_id:
 *           type: string
 *           format: uuid
 *           description: UUID of the user who received the notification.
 *           example: "d290f1ee-6c54-4b01-90e6-d701748f0851"
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the notification was created.
 *           readOnly: true
 *           example: "2023-01-01T12:00:00Z"
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the notification was last updated.
 *           readOnly: true
 *           example: "2023-01-02T15:00:00Z"
 * 
 *   parameters:
 *     pushNotificationId:
 *       in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: string
 *         format: uuid
 *       description: UUID of the push notification.
 *       example: "550e8400-e29b-41d4-a716-446655440000"
 */
