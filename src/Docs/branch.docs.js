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


/**
 * @swagger
 * tags:
 *   - name: Branch Management
 *     description: Restaurant branch operations and location services
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Branch:
 *       type: object
 *       required:
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
 *           example: "d290f1ee-6c54-4b01-90e6-d701748f0851"
 *         name:
 *           type: string
 *           example: "Downtown Branch"
 *         address_line1:
 *           type: string
 *           example: "123 Main Street"
 *         address_line2:
 *           type: string
 *           example: "Suite 100"
 *         city:
 *           type: string
 *           example: "New York"
 *         state:
 *           type: string
 *           example: "NY"
 *         postal_code:
 *           type: string
 *           example: "10001"
 *         country:
 *           type: string
 *           example: "USA"
 *         phone:
 *           type: string
 *           example: "+12125551234"
 *         email:
 *           type: string
 *           format: email
 *           example: "downtown@restaurant.com"
 *         location:
 *           type: object
 *           properties:
 *             type:
 *               type: string
 *               enum: [Point]
 *               example: "Point"
 *             coordinates:
 *               type: array
 *               items:
 *                 type: number
 *               example: [-73.987654, 40.748817]
 *         operating_hours:
 *           type: object
 *           properties:
 *             monday:
 *               type: string
 *               example: "9:00 AM - 10:00 PM"
 *             tuesday:
 *               type: string
 *               example: "9:00 AM - 10:00 PM"
 *         delivery_available:
 *           type: boolean
 *           example: true
 *         coverage_radius:
 *           type: integer
 *           description: "Delivery coverage radius in meters"
 *           example: 5000
 *         crowd_status:
 *           type: string
 *           enum: [quiet, busy, packed]
 *           example: "busy"
 *         status_updated_at:
 *           type: string
 *           format: date-time
 *           example: "2024-05-27T14:30:00Z"
 *         is_active:
 *           type: boolean
 *           example: true
 *         created_at:
 *           type: string
 *           format: date-time
 *           example: "2024-01-15T09:00:00Z"
 *         updated_at:
 *           type: string
 *           format: date-time
 *           example: "2024-05-27T14:30:00Z"
 * 
 *     BranchWithAssociations:
 *       allOf:
 *         - $ref: '#/components/schemas/Branch'
 *         - type: object
 *           properties:
 *             deals:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BranchDeal'
 *             menu:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BranchMenu'
 * 
 *     CoverageResult:
 *       type: object
 *       properties:
 *         branchId:
 *           type: string
 *           format: uuid
 *           example: "d290f1ee-6c54-4b01-90e6-d701748f0851"
 *         distance:
 *           type: number
 *           format: float
 *           description: "Distance in kilometers"
 *           example: 2.5
 *         coverageRadius:
 *           type: number
 *           format: float
 *           description: "Coverage radius in kilometers"
 *           example: 5.0
 *         isWithinCoverage:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "Location is within coverage area"
 * 
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           example: "Branch not found"
 * 
 *     Pagination:
 *       type: object
 *       properties:
 *         total:
 *           type: integer
 *           example: 100
 *         limit:
 *           type: integer
 *           example: 10
 *         offset:
 *           type: integer
 *           example: 0
 */

/**
 * @swagger
 * /branches:
 *   post:
 *     summary: Create a new branch (Admin only)
 *     tags: [Branch Management]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Branch'
 *     responses:
 *       201:
 *         description: Branch created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Branch'
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 * 
 *   get:
 *     summary: Get all branches
 *     tags: [Branch Management]
 *     parameters:
 *       - in: query
 *         name: active
 *         schema:
 *           type: boolean
 *         description: Filter by active status (default true)
 *       - in: query
 *         name: delivery
 *         schema:
 *           type: boolean
 *         description: Filter by delivery availability
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 1000
 *         description: Pagination limit (default 100)
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           minimum: 0
 *         description: Pagination offset (default 0)
 *     responses:
 *       200:
 *         description: List of branches
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Branch'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /branches/{id}:
 *   get:
 *     summary: Get branch by ID
 *     tags: [Branch Management]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         example: "d290f1ee-6c54-4b01-90e6-d701748f0851"
 *       - in: query
 *         name: include
 *         schema:
 *           type: boolean
 *         description: Include associated deals and menu items
 *     responses:
 *       200:
 *         description: Branch details
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/Branch'
 *                 - $ref: '#/components/schemas/BranchWithAssociations'
 *       404:
 *         description: Branch not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Server error
 * 
 *   put:
 *     summary: Update branch (Admin only)
 *     tags: [Branch Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Branch'
 *     responses:
 *       200:
 *         description: Updated branch
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Branch'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Branch not found
 * 
 *   delete:
 *     summary: Delete branch (Admin only)
 *     tags: [Branch Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Branch deactivated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Branch deactivated successfully"
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Branch not found
 */

/**
 * @swagger
 * /branches/nearby/location:
 *   get:
 *     summary: Find nearest branches
 *     tags: [Branch Management]
 *     parameters:
 *       - in: query
 *         name: lat
 *         required: true
 *         schema:
 *           type: number
 *           format: float
 *         example: 40.748817
 *       - in: query
 *         name: lng
 *         required: true
 *         schema:
 *           type: number
 *           format: float
 *         example: -73.987654
 *       - in: query
 *         name: radius
 *         schema:
 *           type: integer
 *           minimum: 100
 *           maximum: 50000
 *         description: "Search radius in meters (default 5000)"
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 20
 *         description: "Maximum results (default 5)"
 *     responses:
 *       200:
 *         description: Nearby branches with distances
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 allOf:
 *                   - $ref: '#/components/schemas/Branch'
 *                   - type: object
 *                     properties:
 *                       distance:
 *                         type: number
 *                         format: float
 *                         description: "Distance in kilometers"
 *                         example: 1.2
 *       400:
 *         description: Missing coordinates
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /branches/{id}/coverage:
 *   get:
 *     summary: Check branch coverage for a location
 *     tags: [Branch Management]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: query
 *         name: lat
 *         required: true
 *         schema:
 *           type: number
 *           format: float
 *       - in: query
 *         name: lng
 *         required: true
 *         schema:
 *           type: number
 *           format: float
 *     responses:
 *       200:
 *         description: Coverage check result
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CoverageResult'
 *       400:
 *         description: Missing coordinates
 *       404:
 *         description: Branch not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /branches/{id}/status:
 *   patch:
 *     summary: Update branch crowd status (Manager only)
 *     tags: [Branch Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [quiet, busy, packed]
 *                 example: "busy"
 *     responses:
 *       200:
 *         description: Updated branch
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Branch'
 *       400:
 *         description: Invalid status
 *       404:
 *         description: Branch not found
 */

/**
 * @swagger
 * /branches/status/{status}:
 *   get:
 *     summary: Get branches by crowd status
 *     tags: [Branch Management]
 *     parameters:
 *       - in: path
 *         name: status
 *         required: true
 *         schema:
 *           type: string
 *           enum: [quiet, busy, packed]
 *     responses:
 *       200:
 *         description: List of branches
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Branch'
 *       400:
 *         description: Invalid status
 */

/**
 * @swagger
 * /branches/search/{term}:
 *   get:
 *     summary: Search branches
 *     tags: [Branch Management]
 *     parameters:
 *       - in: path
 *         name: term
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *         description: "Results limit (default 10)"
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           minimum: 0
 *         description: "Results offset (default 0)"
 *     responses:
 *       200:
 *         description: Search results
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Branch'
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /branches/filter/all:
 *   get:
 *     summary: Filter branches
 *     tags: [Branch Management]
 *     parameters:
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *       - in: query
 *         name: state
 *         schema:
 *           type: string
 *       - in: query
 *         name: country
 *         schema:
 *           type: string
 *       - in: query
 *         name: delivery
 *         schema:
 *           type: boolean
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [quiet, busy, packed]
 *       - in: query
 *         name: deals
 *         schema:
 *           type: boolean
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *         description: "Results limit (default 50)"
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           minimum: 0
 *         description: "Results offset (default 0)"
 *     responses:
 *       200:
 *         description: Filtered branches
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Branch'
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */