/**
 * @swagger
 * tags:
 *   name: Items
 *   description: Menu item management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Item:
 *       type: object
 *       required:
 *         - name
 *         - price
 *         - category_id
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: The auto-generated ID
 *         name:
 *           type: string
 *           description: Item name
 *         description:
 *           type: string
 *           description: Item description
 *         price:
 *           type: number
 *           format: float
 *           description: Base price
 *         category_id:
 *           type: string
 *           format: uuid
 *           description: Category ID
 *         is_vegetarian:
 *           type: boolean
 *           default: false
 *         is_active:
 *           type: boolean
 *           default: true
 *         image_url:
 *           type: string
 *           description: URL of item image
 *         variants:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ItemVariant'
 *         addons:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ItemAddon'
 *       example:
 *         id: d5fE_asz
 *         name: Margherita Pizza
 *         description: Classic pizza with tomato and mozzarella
 *         price: 9.99
 *         category_id: 3fa85f64-5717-4562-b3fc-2c963f66afa6
 *         is_vegetarian: true
 *         is_active: true
 *         image_url: https://example.com/images/pizza.jpg
 * 
 *     ItemVariant:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *         price_modifier:
 *           type: number
 *           format: float
 * 
 *     ItemAddon:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *         price:
 *           type: number
 *           format: float
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
 * /items:
 *   post:
 *     summary: Create a new menu item
 *     tags: [Items]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               category_id:
 *                 type: string
 *               is_vegetarian:
 *                 type: boolean
 *               images:
 *                 type: string
 *                 format: binary
 *                 description: Item image (max 1 file)
 *     responses:
 *       201:
 *         description: Item created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /items:
 *   get:
 *     summary: Get all menu items
 *     tags: [Items]
 *     parameters:
 *       - in: query
 *         name: active
 *         schema:
 *           type: boolean
 *         description: Filter by active status (default true)
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category ID
 *       - in: query
 *         name: vegetarian
 *         schema:
 *           type: boolean
 *         description: Filter vegetarian items only
 *       - in: query
 *         name: includeVariants
 *         schema:
 *           type: boolean
 *         description: Include item variants
 *       - in: query
 *         name: includeAddons
 *         schema:
 *           type: boolean
 *         description: Include item addons
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
 *         description: List of items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Item'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /items/{id}:
 *   get:
 *     summary: Get item by ID
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Item ID
 *       - in: query
 *         name: includeVariants
 *         schema:
 *           type: boolean
 *         description: Include item variants
 *       - in: query
 *         name: includeAddons
 *         schema:
 *           type: boolean
 *         description: Include item addons
 *     responses:
 *       200:
 *         description: Item data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       404:
 *         description: Item not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /items/{id}:
 *   put:
 *     summary: Update item details
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Item ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Item'
 *     responses:
 *       200:
 *         description: Updated item
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Item not found
 */

/**
 * @swagger
 * /items/{id}/image:
 *   put:
 *     summary: Update item image
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Item ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               images:
 *                 type: string
 *                 format: binary
 *                 description: New item image (max 1 file)
 *     responses:
 *       200:
 *         description: Item with updated image
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /items/{id}:
 *   delete:
 *     summary: Deactivate an item
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Item ID
 *     responses:
 *       200:
 *         description: Item deactivated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Item deactivated successfully
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */