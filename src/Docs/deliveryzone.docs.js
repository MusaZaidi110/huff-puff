/**
 * @swagger
 * components:
 *   schemas:
 *     DeliveryZone:
 *       type: object
 *       required:
 *         - id
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Unique identifier for the delivery zone (UUIDv4)
 *           example: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
 *         name:
 *           type: string
 *           description: Name of the delivery zone
 *           example: "Downtown Zone"
 *         polygon_coordinates:
 *           type: object
 *           description: GeoJSON polygon representing the delivery zone boundary
 *           example: {
 *             "type": "Polygon",
 *             "coordinates": [
 *               [
 *                 [-122.431297, 37.773972],
 *                 [-122.431297, 37.774972],
 *                 [-122.421297, 37.774972],
 *                 [-122.421297, 37.773972],
 *                 [-122.431297, 37.773972]
 *               ]
 *             ]
 *           }
 *         base_delivery_fee:
 *           type: number
 *           format: float
 *           description: Base delivery fee for this zone in currency units
 *           example: 5.00
 *         per_km_rate:
 *           type: number
 *           format: float
 *           description: Delivery fee charged per kilometer beyond base distance
 *           example: 1.50
 *         minimum_order_amount:
 *           type: number
 *           format: float
 *           description: Minimum order amount required for delivery in this zone
 *           example: 20.00
 *         estimated_delivery_time:
 *           type: integer
 *           description: Estimated delivery time in minutes for this zone
 *           example: 45
 *         branch_id:
 *           type: string
 *           format: uuid
 *           description: Foreign key referencing the branch that owns this delivery zone
 *           example: "d290f1ee-6c54-4b01-90e6-d701748f0851"
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the delivery zone record was created
 *           example: "2025-05-28T10:00:00Z"
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the delivery zone record was last updated
 *           example: "2025-05-29T12:00:00Z"
 */
