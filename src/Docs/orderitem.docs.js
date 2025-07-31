/**
 * @swagger
 * tags:
 *   name: Order Items
 *   description: Management of items within orders
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     OrderItem:
 *       type: object
 *       required:
 *         - order_id
 *         - item_id
 *         - quantity
 *         - unit_price
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Auto-generated order item ID
 *         order_id:
 *           type: string
 *           format: uuid
 *           description: Parent order ID
 *         item_id:
 *           type: string
 *           format: uuid
 *           description: Menu item ID
 *         variant_id:
 *           type: string
 *           format: uuid
 *           description: Selected variant ID
 *         quantity:
 *           type: integer
 *           minimum: 1
 *           description: Item quantity
 *         unit_price:
 *           type: number
 *           format: float
 *           description: Price per unit at time of ordering
 *         special_instructions:
 *           type: string
 *           description: Custom preparation notes
 *         addons:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/OrderItemAddon'
 *         item:
 *           $ref: '#/components/schemas/Item'
 *         variant:
 *           $ref: '#/components/schemas/ItemVariant'
 *       example:
 *         id: 3fa85f64-5717-4562-b3fc-2c963f66afa6
 *         order_id: 3fa85f64-5717-4562-b3fc-2c963f66afa7
 *         item_id: 3fa85f64-5717-4562-b3fc-2c963f66afa8
 *         variant_id: 3fa85f64-5717-4562-b3fc-2c963f66afa9
 *         quantity: 2
 *         unit_price: 12.99
 *         special_instructions: "No onions please"
 * 
 *     OrderItemAddon:
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
 *     OrderItemCreate:
 *       type: object
 *       required:
 *         - item_id
 *         - quantity
 *         - unit_price
 *       properties:
 *         item_id:
 *           type: string
 *           format: uuid
 *         variant_id:
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
 *             $ref: '#/components/schemas/OrderItemAddon'
 *       example:
 *         item_id: 3fa85f64-5717-4562-b3fc-2c963f66afa8
 *         variant_id: 3fa85f64-5717-4562-b3fc-2c963f66afa9
 *         quantity: 1
 *         unit_price: 9.99
 *         special_instructions: "Extra spicy"
 * 
 *     OrderItemUpdate:
 *       type: object
 *       properties:
 *         quantity:
 *           type: integer
 *         special_instructions:
 *           type: string
 *         addons:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/OrderItemAddon'
 * 
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 */

/**
 * @swagger
 * /order-items/{orderId}/items:
 *   post:
 *     summary: Add item to order
 *     tags: [Order Items]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the order to add item to
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderItemCreate'
 *     responses:
 *       201:
 *         description: Item added to order
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderItem'
 *       400:
 *         description: Invalid request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /order-items/items/{id}:
 *   get:
 *     summary: Get order item details
 *     tags: [Order Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Order item ID
 *     responses:
 *       200:
 *         description: Order item details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderItem'
 *       404:
 *         description: Order item not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /order-items/items/{id}:
 *   put:
 *     summary: Update order item
 *     tags: [Order Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Order item ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderItemUpdate'
 *     responses:
 *       200:
 *         description: Updated order item
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderItem'
 *       400:
 *         description: Invalid update data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Order item not found
 */

/**
 * @swagger
 * /order-items/items/{id}:
 *   delete:
 *     summary: Remove item from order
 *     tags: [Order Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Order item ID
 *     responses:
 *       200:
 *         description: Item removed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Order item removed successfully
 *       400:
 *         description: Cannot remove item
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Order item not found
 */