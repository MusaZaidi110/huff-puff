/**
 * @swagger
 * tags:
 *   name: Item Variants
 *   description: Management of item variants (sizes, colors, etc.)
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ItemVariant:
 *       type: object
 *       required:
 *         - name
 *         - price_modifier
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
 *           description: Variant name (e.g., "Large", "Red")
 *         price_modifier:
 *           type: number
 *           format: float
 *           description: Price adjustment from base item
 *         description:
 *           type: string
 *           description: Optional variant description
 *         is_active:
 *           type: boolean
 *           default: true
 *       example:
 *         id: d5fE_asz
 *         item_id: 3fa85f64-5717-4562-b3fc-2c963f66afa6
 *         name: Large
 *         price_modifier: 2.50
 *         description: 16oz size
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
 * /item-variant/{itemId}/variants:
 *   post:
 *     summary: Create a new variant for an item
 *     tags: [Item Variants]
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
 *             $ref: '#/components/schemas/ItemVariant'
 *     responses:
 *       201:
 *         description: Variant created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ItemVariant'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /item-variant/{itemId}/variants:
 *   get:
 *     summary: Get all variants for an item
 *     tags: [Item Variants]
 *     parameters:
 *       - in: path
 *         name: itemId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the parent item
 *     responses:
 *       200:
 *         description: List of variants
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ItemVariant'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /item-variant/variants/{id}:
 *   get:
 *     summary: Get a variant by ID
 *     tags: [Item Variants]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Variant ID
 *     responses:
 *       200:
 *         description: Variant data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ItemVariant'
 *       404:
 *         description: Variant not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /item-variant/variants/{id}:
 *   put:
 *     summary: Update a variant
 *     tags: [Item Variants]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Variant ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ItemVariant'
 *     responses:
 *       200:
 *         description: Updated variant
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ItemVariant'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Variant not found
 */

/**
 * @swagger
 * /item-variant/variants/{id}:
 *   delete:
 *     summary: Delete a variant
 *     tags: [Item Variants]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Variant ID
 *     responses:
 *       200:
 *         description: Variant deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Variant deleted successfully
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Variant not found
 */