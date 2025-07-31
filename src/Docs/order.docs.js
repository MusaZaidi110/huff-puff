/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management system
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       required:
 *         - customer_id
 *         - branch_id
 *         - items
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Auto-generated order ID
 *         customer_id:
 *           type: string
 *           format: uuid
 *         branch_id:
 *           type: string
 *           format: uuid
 *         status:
 *           type: string
 *           enum: [pending, accepted, preparing, ready, out_for_delivery, delivered, cancelled]
 *           default: pending
 *         subtotal:
 *           type: number
 *           format: float
 *         tax:
 *           type: number
 *           format: float
 *         delivery_fee:
 *           type: number
 *           format: float
 *         discount_amount:
 *           type: number
 *           format: float
 *         total_amount:
 *           type: number
 *           format: float
 *         delivery_address:
 *           type: string
 *         special_instructions:
 *           type: string
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/OrderItem'
 *         statusHistory:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/OrderStatusHistory'
 *       example:
 *         id: d5fE_asz
 *         customer_id: 3fa85f64-5717-4562-b3fc-2c963f66afa6
 *         branch_id: 3fa85f64-5717-4562-b3fc-2c963f66afa7
 *         status: pending
 *         subtotal: 25.99
 *         tax: 2.60
 *         delivery_fee: 3.99
 *         total_amount: 32.58
 *         delivery_address: "123 Main St, City"
 * 
 *     OrderItem:
 *       type: object
 *       required:
 *         - item_id
 *         - quantity
 *         - unit_price
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         item_id:
 *           type: string
 *           format: uuid
 *         quantity:
 *           type: integer
 *         unit_price:
 *           type: number
 *           format: float
 *         special_instructions:
 *           type: string
 *         addons:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/OrderAddon'
 * 
 *     OrderAddon:
 *       type: object
 *       properties:
 *         addon_id:
 *           type: string
 *           format: uuid
 *         quantity:
 *           type: integer
 *         unit_price:
 *           type: number
 *           format: float
 * 
 *     OrderStatusHistory:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         status:
 *           type: string
 *         staff_id:
 *           type: string
 *           format: uuid
 *         notes:
 *           type: string
 *         created_at:
 *           type: string
 *           format: date-time
 * 
 *     StatusUpdate:
 *       type: object
 *       required:
 *         - status
 *       properties:
 *         status:
 *           type: string
 *           enum: [accepted, preparing, ready, out_for_delivery, delivered]
 *         notes:
 *           type: string
 * 
 *     CancelRequest:
 *       type: object
 *       required:
 *         - reason
 *       properties:
 *         reason:
 *           type: string
 * 
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 */

/**
 * @swagger
 * /order:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       201:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /order/{id}:
 *   get:
 *     summary: Get order by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Order ID
 *       - in: query
 *         name: includeCustomer
 *         schema:
 *           type: boolean
 *         description: Include customer details
 *     responses:
 *       200:
 *         description: Order details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Order not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /order:
 *   get:
 *     summary: Get orders with filters
 *     tags: [Orders]
 *     parameters:
 *       - in: query
 *         name: customerId
 *         schema:
 *           type: string
 *         description: Filter by customer ID
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, accepted, preparing, ready, out_for_delivery, delivered, cancelled]
 *         description: Filter by order status
 *       - in: query
 *         name: branchId
 *         schema:
 *           type: string
 *         description: Filter by branch ID
 *       - in: query
 *         name: fromDate
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Filter orders created after this date
 *       - in: query
 *         name: toDate
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Filter orders created before this date
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 100
 *         description: Pagination limit
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Pagination offset
 *     responses:
 *       200:
 *         description: List of orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /order/{id}/status:
 *   put:
 *     summary: Update order status
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StatusUpdate'
 *     responses:
 *       200:
 *         description: Order status updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Invalid status transition
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Order not found
 */

/**
 * @swagger
 * /order/{id}/cancel:
 *   put:
 *     summary: Cancel an order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CancelRequest'
 *     responses:
 *       200:
 *         description: Order cancelled
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Cannot cancel order
 *       404:
 *         description: Order not found
 */

/**
 * @swagger
 * /order/{id}/recalculate:
 *   post:
 *     summary: Recalculate order totals
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order with recalculated totals
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Error recalculating
 *       404:
 *         description: Order not found
 */