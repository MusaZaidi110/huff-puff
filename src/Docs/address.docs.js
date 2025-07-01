/**
 * @swagger
 * components:
 *   schemas:
 *     Address:
 *       type: object
 *       description: Represents a user's address, including optional geographic coordinates.
 *       required:
 *         - id
 *         - address_line1
 *         - city
 *         - state
 *         - postal_code
 *         - country
 *         - location
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Unique identifier for the address.
 *           example: "ad7f83f2-0e34-4f6c-875c-9572b7d8fcf2"
 *
 *         user_id:
 *           type: string
 *           format: uuid
 *           description: The ID of the user to whom this address belongs.
 *           example: "a7c29e82-2ec2-4cf0-b8e0-bf84dc137f25"
 *
 *         address_line1:
 *           type: string
 *           description: Primary address line.
 *           example: "123 Main Street"
 *
 *         address_line2:
 *           type: string
 *           description: Secondary address line (optional).
 *           example: "Apt 4B"
 *
 *         city:
 *           type: string
 *           description: City of the address.
 *           example: "San Francisco"
 *
 *         state:
 *           type: string
 *           description: State or province of the address.
 *           example: "California"
 *
 *         postal_code:
 *           type: string
 *           description: ZIP or postal code.
 *           example: "94105"
 *
 *         country:
 *           type: string
 *           description: Country name.
 *           example: "United States"
 *
 *         is_default:
 *           type: boolean
 *           description: Indicates whether this address is the default for the user.
 *           example: true
 *
 *         location:
 *           type: object
 *           description: Geographic coordinates of the address.
 *           properties:
 *             type:
 *               type: string
 *               enum: [Point]
 *               example: "Point"
 *             coordinates:
 *               type: array
 *               description: [longitude, latitude]
 *               items:
 *                 type: number
 *               example: [-122.4194, 37.7749]
 *
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the address was created.
 *           example: "2025-05-30T08:30:00Z"
 *
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the address was last updated.
 *           example: "2025-05-30T08:45:00Z"
 */
