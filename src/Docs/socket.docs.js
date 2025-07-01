/**
 * @swagger
 * tags:
 *   - name: Socket.IO
 *     description: Real-time WebSocket events for delivery tracking system
 *
 * components:
 *   schemas:
 *     LocationUpdate:
 *       type: object
 *       required:
 *         - trackingId
 *         - riderId
 *         - userId
 *         - latitude
 *         - longitude
 *       properties:
 *         trackingId:
 *           type: string
 *           description: Unique identifier for the delivery tracking record
 *           example: "f9a1d6d8-1c5a-4f44-a6a5-9c7e12345678"
 *         riderId:
 *           type: string
 *           description: Identifier for the delivery rider sending the update
 *           example: "rider_456"
 *         userId:
 *           type: string
 *           description: Identifier for the customer receiving location updates
 *           example: "user_123"
 *         latitude:
 *           type: number
 *           format: float
 *           description: Current latitude of the rider
 *           example: 40.712776
 *         longitude:
 *           type: number
 *           format: float
 *           description: Current longitude of the rider
 *           example: -74.005974
 *         status:
 *           type: string
 *           description: Current delivery status (optional)
 *           example: "en_route"
 *         estimatedArrival:
 *           type: string
 *           format: date-time
 *           description: Estimated arrival time at destination (optional)
 *           example: "2025-05-30T15:30:00Z"
 *         actualDistance:
 *           type: number
 *           description: Distance in kilometers from rider to user (optional)
 *           example: 3.2
 *
 * paths:
 *   /socket.io:
 *     get:
 *       tags:
 *         - Socket.IO
 *       summary: WebSocket connection endpoint for delivery tracking
 *       description: |
 *         Establish a WebSocket connection using Socket.IO at this endpoint.
 *         
 *         After connecting, clients should emit events to join the system and send/receive location updates.
 *         
 *         **URL example:** `ws://localhost:8000/socket.io`
 *       responses:
 *         101:
 *           description: Switching Protocols - WebSocket connection established
 *
 * Socket.IO Events:
 *   - Event: user:join
 *     type: emit
 *     description: |
 *       Sent by a user (customer or staff) upon connection to register their socket ID for receiving updates.
 *     payload:
 *       type: string
 *       example: "user_123"
 *
 *   - Event: rider:join
 *     type: emit
 *     description: |
 *       Sent by a delivery rider to register their socket ID so the system can accept location updates from them.
 *     payload:
 *       type: string
 *       example: "rider_456"
 *
 *   - Event: rider:updateLocation
 *     type: emit
 *     description: |
 *       Sent by the rider to update their current location and delivery status.
 *       The server broadcasts this update to the assigned user and buffers it for periodic database updates.
 *     payload:
 *       $ref: '#/components/schemas/LocationUpdate'
 *
 *   - Event: user:locationUpdate
 *     type: receive
 *     description: |
 *       Sent from server to the user when a rider updates location.
 *       Carries the latest location and status info for the user's delivery.
 *     payload:
 *       $ref: '#/components/schemas/LocationUpdate'
 *
 *   - Event: disconnect
 *     type: automatic
 *     description: |
 *       Triggered when a socket disconnects (user or rider).
 *       The server cleans up stored socket IDs related to that socket.
 */
