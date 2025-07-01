/**
 * @swagger
 * components:
 *   schemas:
 *     DeliveryPerson:
 *       type: object
 *       description: Represents a delivery person, including vehicle details, current status, and location.
 *       required:
 *         - id
 *         - location
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Unique identifier for the delivery person.
 *           example: "d8e5c0f5-f7b4-4e1c-976a-1f77c19b63ad"

 *         user_id:
 *           type: string
 *           format: uuid
 *           description: ID of the user associated with this delivery person.
 *           example: "6d920f09-24d1-4c9f-8b9d-243fe7a37bb6"

 *         branch_id:
 *           type: string
 *           format: uuid
 *           description: ID of the branch the delivery person is assigned to.
 *           example: "b0fd2313-2195-4f21-b12c-d54a6b6f563a"

 *         vehicle_type:
 *           type: string
 *           description: Type of vehicle used by the delivery person (e.g., bike, car).
 *           example: "motorbike"

 *         vehicle_number:
 *           type: string
 *           description: Registration number of the delivery vehicle.
 *           example: "ABC-1234"

 *         availability_status:
 *           type: string
 *           enum: [available, busy, offline]
 *           default: offline
 *           description: Current availability status of the delivery person.
 *           example: "available"

 *         location:
 *           type: object
 *           description: Geolocation of the delivery person in GeoJSON Point format.
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
 *               example: [73.0479, 33.6844]  # longitude, latitude

 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Record creation timestamp.
 *           example: "2025-05-30T08:00:00Z"

 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Record last updated timestamp.
 *           example: "2025-05-30T09:00:00Z"
 */
