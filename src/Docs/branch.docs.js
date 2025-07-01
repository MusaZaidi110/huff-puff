/**
 * @swagger
 * components:
 *   schemas:
 *     Branch:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - address_line1
 *         - city
 *         - state
 *         - postal_code
 *         - country
 *         - phone
 *         - location
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Unique identifier for the branch (UUIDv4)
 *           example: "d290f1ee-6c54-4b01-90e6-d701748f0851"
 *         name:
 *           type: string
 *           description: Name of the branch
 *           example: "Main Branch"
 *         address_line1:
 *           type: string
 *           description: Primary address line of the branch
 *           example: "1234 Market Street"
 *         address_line2:
 *           type: string
 *           description: Secondary address line (optional)
 *           example: "Suite 100"
 *         city:
 *           type: string
 *           description: City where the branch is located
 *           example: "San Francisco"
 *         state:
 *           type: string
 *           description: State or province of the branch
 *           example: "California"
 *         postal_code:
 *           type: string
 *           description: Postal or ZIP code of the branch
 *           example: "94103"
 *         country:
 *           type: string
 *           description: Country of the branch location
 *           example: "USA"
 *         phone:
 *           type: string
 *           description: Contact phone number for the branch
 *           example: "+1-415-555-1234"
 *         email:
 *           type: string
 *           format: email
 *           description: Contact email for the branch (optional)
 *           example: "contact@mainbranch.example.com"
 *         operating_hours:
 *           type: object
 *           description: Operating hours of the branch (optional)
 *           example: { "mon-fri": "9am - 6pm", "sat": "10am - 4pm", "sun": "Closed" }
 *           additionalProperties:
 *             type: string
 *         location:
 *           type: object
 *           description: Geographical location of the branch as a point (longitude, latitude)
 *           required:
 *             - type
 *             - coordinates
 *           properties:
 *             type:
 *               type: string
 *               enum: [Point]
 *               example: "Point"
 *             coordinates:
 *               type: array
 *               items:
 *                 type: number
 *               description: [longitude, latitude]
 *               example: [-122.4194, 37.7749]
 *         is_active:
 *           type: boolean
 *           description: Indicates if the branch is currently active
 *           default: true
 *           example: true
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the branch was created
 *           example: "2024-05-27T12:00:00Z"
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the branch was last updated
 *           example: "2024-05-28T15:30:00Z"
 */
