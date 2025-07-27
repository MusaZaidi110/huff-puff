/**
 * @swagger
 * tags:
 *   - name: Customer Loyalty
 *     description: Customer loyalty points and rewards management
 *   - name: Customer Rewards
 *     description: Customer reward redemption and management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CustomerReward:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "550e8400-e29b-41d4-a716-446655440000"
 *         customer_id:
 *           type: string
 *           format: uuid
 *           example: "660e8400-e29b-41d4-a716-446655440000"
 *         reward_id:
 *           type: string
 *           format: uuid
 *           example: "770e8400-e29b-41d4-a716-446655440000"
 *         is_used:
 *           type: boolean
 *           example: false
 *         expires_at:
 *           type: string
 *           format: date-time
 *           example: "2024-12-31T23:59:59Z"
 *         created_at:
 *           type: string
 *           format: date-time
 *           example: "2024-05-01T12:00:00Z"
 *         updated_at:
 *           type: string
 *           format: date-time
 *           example: "2024-05-15T09:30:00Z"
 *         reward:
 *           $ref: '#/components/schemas/LoyaltyReward'
 *
 *     LoyaltyReward:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "770e8400-e29b-41d4-a716-446655440000"
 *         name:
 *           type: string
 *           example: "Free Coffee"
 *         description:
 *           type: string
 *           example: "Redeem for a free premium coffee"
 *         points_required:
 *           type: integer
 *           example: 100
 *         is_active:
 *           type: boolean
 *           example: true
 *         expires_at:
 *           type: string
 *           format: date-time
 *           example: "2024-12-31T23:59:59Z"
 *
 *     LoyaltyPointsSummary:
 *       type: object
 *       properties:
 *         totalLoyaltyPoints:
 *           type: integer
 *           description: Current points balance
 *           example: 350
 *         totalEarnedPoints:
 *           type: integer
 *           description: Total points earned from orders/activities
 *           example: 200
 *         totalPurchasedPoints:
 *           type: integer
 *           description: Total points purchased
 *           example: 150
 *         totalConsumedPoints:
 *           type: integer
 *           description: Total points redeemed
 *           example: 100
 *         totalSentPoints:
 *           type: integer
 *           description: Total points transferred to others
 *           example: 50
 *         totalReceivedPoints:
 *           type: integer
 *           description: Total points received from others
 *           example: 25
 *         transactions:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/LoyaltyPointsTransaction'
 *
 *     LoyaltyPointsTransaction:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "880e8400-e29b-41d4-a716-446655440000"
 *         customer_id:
 *           type: string
 *           format: uuid
 *           example: "660e8400-e29b-41d4-a716-446655440000"
 *         points:
 *           type: integer
 *           example: 50
 *         transaction_type:
 *           type: string
 *           enum: [earned, redeemed, referral, adjusted, transfer]
 *           example: "earned"
 *         source_type:
 *           type: string
 *           enum: [order, purchase, reward, adjustment, transfer]
 *           example: "order"
 *         source_id:
 *           type: string
 *           example: "ORD12345"
 *         description:
 *           type: string
 *           example: "Earned 50 points from order #ORD12345"
 *         created_at:
 *           type: string
 *           format: date-time
 *           example: "2024-05-01T12:00:00Z"
 *
 *     LoyaltyPointPurchase:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "990e8400-e29b-41d4-a716-446655440000"
 *         customer_id:
 *           type: string
 *           format: uuid
 *           example: "660e8400-e29b-41d4-a716-446655440000"
 *         points_purchased:
 *           type: integer
 *           example: 100
 *         amount_paid:
 *           type: number
 *           format: float
 *           example: 10.00
 *         payment_method:
 *           type: string
 *           example: "credit_card"
 *         payment_status:
 *           type: string
 *           enum: [pending, completed, failed]
 *           example: "completed"
 *         created_at:
 *           type: string
 *           format: date-time
 *           example: "2024-05-01T12:00:00Z"
 *
 *     LoyaltyPointTransfer:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "aa0e8400-e29b-41d4-a716-446655440000"
 *         sender_id:
 *           type: string
 *           format: uuid
 *           example: "660e8400-e29b-41d4-a716-446655440000"
 *         receiver_id:
 *           type: string
 *           format: uuid
 *           example: "bb0e8400-e29b-41d4-a716-446655440000"
 *         points_transferred:
 *           type: integer
 *           example: 50
 *         message:
 *           type: string
 *           example: "Enjoy these points!"
 *         is_accepted:
 *           type: boolean
 *           example: false
 *         created_at:
 *           type: string
 *           format: date-time
 *           example: "2024-05-01T12:00:00Z"
 *         sender:
 *           $ref: '#/components/schemas/Customer'
 *
 *     Customer:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "660e8400-e29b-41d4-a716-446655440000"
 *         first_name:
 *           type: string
 *           example: "John"
 *         last_name:
 *           type: string
 *           example: "Doe"
 *         email:
 *           type: string
 *           format: email
 *           example: "john.doe@example.com"
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           example: "Unauthorized"
 */

/**
 * @swagger
 * /customers/{customerId}/rewards:
 *   post:
 *     summary: Assign a reward to a customer
 *     description: Assign a loyalty reward to a customer (typically after redemption)
 *     tags: [Customer Rewards]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: customerId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         example: "660e8400-e29b-41d4-a716-446655440000"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - rewardId
 *             properties:
 *               rewardId:
 *                 type: string
 *                 format: uuid
 *                 example: "770e8400-e29b-41d4-a716-446655440000"
 *     responses:
 *       201:
 *         description: Reward successfully assigned
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CustomerReward'
 *       400:
 *         description: Invalid request or reward not available
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Unauthorized access
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *   get:
 *     summary: Get customer's available rewards
 *     description: Retrieve all active, unused rewards for a customer
 *     tags: [Customer Rewards]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: customerId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         example: "660e8400-e29b-41d4-a716-446655440000"
 *     responses:
 *       200:
 *         description: List of customer rewards
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CustomerReward'
 *       403:
 *         description: Unauthorized access
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /customers/{customerId}/points:
 *   get:
 *     summary: Get customer's loyalty points summary
 *     description: Retrieve detailed summary of customer's loyalty points (balance, earned, spent, etc.)
 *     tags: [Customer Loyalty]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: customerId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         example: "660e8400-e29b-41d4-a716-446655440000"
 *     responses:
 *       200:
 *         description: Loyalty points summary
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoyaltyPointsSummary'
 *       403:
 *         description: Unauthorized access
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /customers/{customerId}/points/purchase:
 *   post:
 *     summary: Purchase loyalty points
 *     description: Initiate a loyalty points purchase transaction
 *     tags: [Customer Loyalty]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: customerId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         example: "660e8400-e29b-41d4-a716-446655440000"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - points
 *               - amount
 *               - paymentMethod
 *             properties:
 *               points:
 *                 type: integer
 *                 minimum: 1
 *                 example: 100
 *               amount:
 *                 type: number
 *                 format: float
 *                 minimum: 0.01
 *                 example: 10.00
 *               paymentMethod:
 *                 type: string
 *                 enum: [credit_card, debit_card, paypal, bank_transfer]
 *                 example: "credit_card"
 *     responses:
 *       201:
 *         description: Points purchase initiated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoyaltyPointPurchase'
 *       400:
 *         description: Invalid request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Unauthorized access
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /customers/{customerId}/points/redeem:
 *   post:
 *     summary: Redeem loyalty points for a reward
 *     description: Exchange loyalty points for a specific reward
 *     tags: [Customer Loyalty]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: customerId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         example: "660e8400-e29b-41d4-a716-446655440000"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - rewardId
 *               - points
 *             properties:
 *               rewardId:
 *                 type: string
 *                 format: uuid
 *                 example: "770e8400-e29b-41d4-a716-446655440000"
 *               points:
 *                 type: integer
 *                 minimum: 1
 *                 example: 100
 *     responses:
 *       201:
 *         description: Points successfully redeemed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 transaction:
 *                   $ref: '#/components/schemas/LoyaltyPointsTransaction'
 *                 customerReward:
 *                   $ref: '#/components/schemas/CustomerReward'
 *       400:
 *         description: Invalid request or insufficient points
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Unauthorized access
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /customers/{senderId}/points/transfer:
 *   post:
 *     summary: Transfer loyalty points to another customer
 *     description: Send loyalty points from one customer to another
 *     tags: [Customer Loyalty]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: senderId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         example: "660e8400-e29b-41d4-a716-446655440000"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - receiverId
 *               - points
 *             properties:
 *               receiverId:
 *                 type: string
 *                 format: uuid
 *                 example: "bb0e8400-e29b-41d4-a716-446655440000"
 *               points:
 *                 type: integer
 *                 minimum: 1
 *                 example: 50
 *               message:
 *                 type: string
 *                 example: "Enjoy these points!"
 *     responses:
 *       201:
 *         description: Points transfer initiated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoyaltyPointTransfer'
 *       400:
 *         description: Invalid request or insufficient points
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Unauthorized access
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /customers/{receiverId}/points/transfers/pending:
 *   get:
 *     summary: Get pending points transfers
 *     description: Retrieve all pending loyalty points transfers for a customer
 *     tags: [Customer Loyalty]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: receiverId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         example: "bb0e8400-e29b-41d4-a716-446655440000"
 *     responses:
 *       200:
 *         description: List of pending transfers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/LoyaltyPointTransfer'
 *       403:
 *         description: Unauthorized access
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
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

/**
 * @swagger
 * tags:
 *   - name: Loyalty Points
 *     description: Loyalty points conversion, transfers, and purchase completion
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     LoyaltyPointPurchaseCompletion:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "990e8400-e29b-41d4-a716-446655440000"
 *         customer_id:
 *           type: string
 *           format: uuid
 *           example: "660e8400-e29b-41d4-a716-446655440000"
 *         points_purchased:
 *           type: integer
 *           example: 100
 *         amount_paid:
 *           type: number
 *           format: float
 *           example: 10.00
 *         payment_method:
 *           type: string
 *           example: "credit_card"
 *         payment_status:
 *           type: string
 *           enum: [pending, completed, failed]
 *           example: "completed"
 *         transaction_id:
 *           type: string
 *           example: "txn_123456789"
 *         created_at:
 *           type: string
 *           format: date-time
 *           example: "2024-05-01T12:00:00Z"
 *
 *     PointsTransferResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "aa0e8400-e29b-41d4-a716-446655440000"
 *         sender_id:
 *           type: string
 *           format: uuid
 *           example: "660e8400-e29b-41d4-a716-446655440000"
 *         receiver_id:
 *           type: string
 *           format: uuid
 *           example: "bb0e8400-e29b-41d4-a716-446655440000"
 *         points_transferred:
 *           type: integer
 *           example: 50
 *         message:
 *           type: string
 *           example: "Enjoy these points!"
 *         is_accepted:
 *           type: boolean
 *           example: true
 *         created_at:
 *           type: string
 *           format: date-time
 *           example: "2024-05-01T12:00:00Z"
 *
 *     ConversionRate:
 *       type: object
 *       properties:
 *         ratio:
 *           type: number
 *           format: float
 *           description: "Points to currency conversion ratio (e.g., 10 means 10 points = 1 currency unit)"
 *           example: 10.0
 *
 *     ConversionResult:
 *       type: object
 *       properties:
 *         currencyValue:
 *           type: number
 *           format: float
 *           example: 5.0
 *         points:
 *           type: integer
 *           example: 50
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           example: "Invalid points parameter"
 */

/**
 * @swagger
 * /points/point-purchases/{id}/complete:
 *   post:
 *     summary: Complete a points purchase transaction
 *     description: Typically called by a payment webhook to finalize points purchase
 *     tags: [Loyalty Points]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         example: "990e8400-e29b-41d4-a716-446655440000"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - transactionId
 *             properties:
 *               transactionId:
 *                 type: string
 *                 example: "txn_123456789"
 *     responses:
 *       200:
 *         description: Points purchase completed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoyaltyPointPurchaseCompletion'
 *       400:
 *         description: Invalid request or purchase not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /points/customer-rewards/{id}/use:
 *   patch:
 *     summary: Mark a customer reward as used
 *     description: Redeem a reward that was previously assigned to a customer
 *     tags: [Loyalty Points]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         example: "550e8400-e29b-41d4-a716-446655440000"
 *     responses:
 *       200:
 *         description: Reward successfully marked as used
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CustomerReward'
 *       400:
 *         description: Invalid request or reward already used/expired
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Unauthorized access
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Reward not found
 */

/**
 * @swagger
 * /points/point-transfers/{id}/accept:
 *   patch:
 *     summary: Accept a points transfer
 *     description: Accept pending loyalty points transfer from another customer
 *     tags: [Loyalty Points]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         example: "aa0e8400-e29b-41d4-a716-446655440000"
 *     responses:
 *       200:
 *         description: Points transfer accepted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PointsTransferResponse'
 *       400:
 *         description: Invalid request or transfer already processed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Unauthorized access
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Transfer not found
 */

/**
 * @swagger
 * /points/point-transfers/{id}/decline:
 *   patch:
 *     summary: Decline a points transfer
 *     description: Reject pending loyalty points transfer from another customer
 *     tags: [Loyalty Points]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         example: "aa0e8400-e29b-41d4-a716-446655440000"
 *     responses:
 *       200:
 *         description: Points transfer declined
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Transfer declined and deleted"
 *       403:
 *         description: Unauthorized access
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Transfer not found
 */

/**
 * @swagger
 * /points/conversion-rate:
 *   get:
 *     summary: Get current points to currency conversion rate
 *     description: Retrieve the current exchange rate between loyalty points and currency
 *     tags: [Loyalty Points]
 *     responses:
 *       200:
 *         description: Current conversion rate
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ConversionRate'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /points/convert-to-currency:
 *   get:
 *     summary: Convert loyalty points to currency value
 *     description: Calculate the monetary value of given loyalty points
 *     tags: [Loyalty Points]
 *     parameters:
 *       - in: query
 *         name: points
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         example: 100
 *     responses:
 *       200:
 *         description: Currency value calculation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ConversionResult'
 *       400:
 *         description: Invalid points parameter
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /points/convert-to-points:
 *   get:
 *     summary: Convert currency amount to loyalty points
 *     description: Calculate how many points a given currency amount would purchase
 *     tags: [Loyalty Points]
 *     parameters:
 *       - in: query
 *         name: amount
 *         required: true
 *         schema:
 *           type: number
 *           format: float
 *           minimum: 0.01
 *         example: 10.00
 *     responses:
 *       200:
 *         description: Points calculation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ConversionResult'
 *       400:
 *         description: Invalid amount parameter
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
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
