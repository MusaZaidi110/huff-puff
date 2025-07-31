/**
 * @swagger
 * components:
 *   schemas:
 *     ItemAddon:
 *       type: object
 *       description: Represents an optional add-on or extra for an item, such as toppings or side dishes.
 *       required:
 *         - id
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Unique identifier for the item addon (UUIDv4).
 *           example: "550e8400-e29b-41d4-a716-446655440000"
 *         name:
 *           type: string
 *           description: Name of the addon.
 *           example: "Extra Cheese"
 *         price:
 *           type: number
 *           format: double
 *           description: Additional price for this addon.
 *           default: 0
 *           example: 1.50
 *         is_active:
 *           type: boolean
 *           description: Indicates if the addon is currently active and available.
 *           default: true
 *           example: true
 *         created_at:
 *           type: string
 *           format: date-time
 *           readOnly: true
 *           description: Timestamp when the addon was created.
 *           example: "2023-01-01T12:00:00Z"
 *         updated_at:
 *           type: string
 *           format: date-time
 *           readOnly: true
 *           description: Timestamp when the addon was last updated.
 *           example: "2023-01-02T15:00:00Z"
 *         item_id:
 *           type: string
 *           format: uuid
 *           nullable: true
 *           description: UUID of the item this addon belongs to.
 *           example: "a1234567-e29b-41d4-a716-446655440000"
 *
 *   parameters:
 *     itemAddonId:
 *       in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: string
 *         format: uuid
 *       description: UUID of the item addon.
 *       example: "550e8400-e29b-41d4-a716-446655440000"
 */



/**
 * @swagger
 * tags:
 *   name: Item Addons
 *   description: Management of item addons (extra toppings, sauces, etc.)
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ItemAddon:
 *       type: object
 *       required:
 *         - name
 *         - price
 *         - item_id
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: The auto-generated ID
 *         item_id:
 *           type: string
 *           format: uuid
 *           description: ID of the parent item
 *         name:
 *           type: string
 *           description: Addon name (e.g., "Extra Cheese", "Bacon")
 *         price:
 *           type: number
 *           format: float
 *           description: Additional price for this addon
 *         description:
 *           type: string
 *           description: Optional addon description
 *         is_active:
 *           type: boolean
 *           default: true
 *       example:
 *         id: d5fE_asz
 *         item_id: 3fa85f64-5717-4562-b3fc-2c963f66afa6
 *         name: Extra Cheese
 *         price: 1.50
 *         description: Shredded mozzarella cheese
 *         is_active: true
 * 
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: Error message
 */

/**
 * @swagger
 * /item-addon/{itemId}/addons:
 *   post:
 *     summary: Create a new addon for an item
 *     tags: [Item Addons]
 *     parameters:
 *       - in: path
 *         name: itemId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the parent item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ItemAddon'
 *     responses:
 *       201:
 *         description: Addon created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ItemAddon'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /item-addon/{itemId}/addons:
 *   get:
 *     summary: Get all addons for an item
 *     tags: [Item Addons]
 *     parameters:
 *       - in: path
 *         name: itemId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the parent item
 *     responses:
 *       200:
 *         description: List of addons
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ItemAddon'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /item-addon/addons/{id}:
 *   get:
 *     summary: Get an addon by ID
 *     tags: [Item Addons]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Addon ID
 *     responses:
 *       200:
 *         description: Addon data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ItemAddon'
 *       404:
 *         description: Addon not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /item-addon/addons/{id}:
 *   put:
 *     summary: Update an addon
 *     tags: [Item Addons]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Addon ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ItemAddon'
 *     responses:
 *       200:
 *         description: Updated addon
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ItemAddon'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Addon not found
 */

/**
 * @swagger
 * /item-addon/addons/{id}:
 *   delete:
 *     summary: Delete an addon
 *     tags: [Item Addons]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Addon ID
 *     responses:
 *       200:
 *         description: Addon deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Addon deleted successfully
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Addon not found
 */