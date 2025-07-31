/**
 * @swagger
 * tags:
 *   name: Order Addons
 *   description: Management of addons for order items
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     OrderItemAddon:
 *       type: object
 *       required:
 *         - order_item_id
 *         - addon_id
 *         - quantity
 *         - unit_price
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Auto-generated order addon ID
 *         order_item_id:
 *           type: string
 *           format: uuid
 *           description: Parent order item ID
 *         addon_id:
 *           type: string
 *           format: uuid
 *           description: Menu addon ID
 *         quantity:
 *           type: integer
 *           minimum: 1
 *           description: Addon quantity
 *         unit_price:
 *           type: number
 *           format: float
 *           description: Price per unit at time of ordering
 *         addon:
 *           $ref: '#/components/schemas/ItemAddon'
 *       example:
 *         id: 3fa85f64-5717-4562-b3fc-2c963f66afa6
 *         order_item_id: 3fa85f64-5717-4562-b3fc-2c963f66afa7
 *         addon_id: 3fa85f64-5717-4562-b3fc-2c963f66afa8
 *         quantity: 2
 *         unit_price: 1.50

 *     OrderItemAddonCreate:
 *       type: object
 *       required:
 *         - addon_id
 *         - quantity
 *         - unit_price
 *       properties:
 *         addon_id:
 *           type: string
 *           format: uuid
 *         quantity:
 *           type: integer
 *           minimum: 1
 *         unit_price:
 *           type: number
 *           format: float
 *       example:
 *         addon_id: 3fa85f64-5717-4562-b3fc-2c963f66afa8
 *         quantity: 1
 *         unit_price: 1.50

 *     OrderItemAddonUpdate:
 *       type: object
 *       properties:
 *         quantity:
 *           type: integer
 *           minimum: 1
 *       example:
 *         quantity: 3

 *     ErrorResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 */

/**
 * @swagger
 * /order-addons/order-items/{orderItemId}/addons:
 *   post:
 *     summary: Add addon to order item
 *     tags: [Order Addons]
 *     parameters:
 *       - in: path
 *         name: orderItemId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the order item to add addon to
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderItemAddonCreate'
 *     responses:
 *       201:
 *         description: Addon added to order item
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderItemAddon'
 *       400:
 *         description: Invalid request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /order-addons/addons/{id}:
 *   get:
 *     summary: Get order item addon details
 *     tags: [Order Addons]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Order item addon ID
 *     responses:
 *       200:
 *         description: Order item addon details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderItemAddon'
 *       404:
 *         description: Order item addon not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /order-addons/addons/{id}:
 *   put:
 *     summary: Update order item addon
 *     tags: [Order Addons]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Order item addon ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderItemAddonUpdate'
 *     responses:
 *       200:
 *         description: Updated order item addon
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderItemAddon'
 *       400:
 *         description: Invalid update data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Order item addon not found
 */

/**
 * @swagger
 * /order-addons/addons/{id}:
 *   delete:
 *     summary: Remove addon from order item
 *     tags: [Order Addons]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Order item addon ID
 *     responses:
 *       200:
 *         description: Addon removed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Order item addon removed successfully
 *       400:
 *         description: Cannot remove addon
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Order item addon not found
 */