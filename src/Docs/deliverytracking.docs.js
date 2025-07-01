/**
 * @swagger
 * components:
 *   schemas:
 *     DeliveryTracking:
 *       type: object
 *       required:
 *         - id
 *         - delivery_person_id
 *         - user_id
 *         - location
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Unique identifier for the delivery tracking record (UUIDv4)
 *           example: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
 *         delivery_person_id:
 *           type: string
 *           format: uuid
 *           description: Foreign key referencing the delivery person responsible
 *           example: "d290f1ee-6c54-4b01-90e6-d701748f0851"
 *         user_id:
 *           type: string
 *           format: uuid
 *           description: Foreign key referencing the user receiving the delivery
 *           example: "e2a1b3c5-7d4a-4f25-b734-90c9b6c3f55b"
 *         location:
 *           type: object
 *           description: Current geographic location of the delivery person as a GeoJSON Point
 *           properties:
 *             type:
 *               type: string
 *               enum: [Point]
 *               example: "Point"
 *             coordinates:
 *               type: array
 *               items:
 *                 type: number
 *               minItems: 2
 *               maxItems: 2
 *               description: Longitude and Latitude coordinates (in this order)
 *               example: [-122.431297, 37.773972]
 *         status:
 *           type: string
 *           enum:
 *             - picked_up
 *             - in_transit
 *             - nearby
 *             - delivered
 *           description: Current status of the delivery
 *           example: "in_transit"
 *         estimated_arrival:
 *           type: string
 *           format: date-time
 *           description: Estimated arrival time at the destination
 *           example: "2025-05-29T15:30:00Z"
 *         actual_distance:
 *           type: number
 *           format: float
 *           description: Distance in kilometers from delivery person to user (optional)
 *           example: 12.75
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the record was created
 *           example: "2025-05-28T10:00:00Z"
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the record was last updated
 *           example: "2025-05-29T12:00:00Z"
 */
