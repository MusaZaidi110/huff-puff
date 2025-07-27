/**
 * @swagger
 * components:
 *   schemas:
 *     Deal:
 *       type: object
 *       required:
 *         - name
 *         - price
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Unique identifier for the deal (UUIDv4)
 *           example: "d290f1ee-6c54-4b01-90e6-d701748f0851"
 *         name:
 *           type: string
 *           description: Name of the deal
 *           example: "Summer Special Combo"
 *         description:
 *           type: string
 *           description: Detailed description of the deal
 *           example: "Includes 2 large pizzas, garlic bread, and a 2L soda"
 *         price:
 *           type: number
 *           format: decimal
 *           description: Original price of the deal
 *           example: 29.99
 *         image_url:
 *           type: string
 *           description: URL of the deal image
 *           example: "https://example.com/images/summer-special.jpg"
 *         discount_percentage:
 *           type: number
 *           format: decimal
 *           description: Discount percentage applied (0-100)
 *           minimum: 0
 *           maximum: 100
 *           default: 0
 *           example: 15.5
 *         is_active:
 *           type: boolean
 *           description: Whether the deal is currently active
 *           default: true
 *           example: true
 *         valid_from:
 *           type: string
 *           format: date-time
 *           description: Date when the deal becomes valid
 *           example: "2024-06-01T00:00:00Z"
 *         valid_to:
 *           type: string
 *           format: date-time
 *           description: Date when the deal expires
 *           example: "2024-08-31T23:59:59Z"
 *         min_selections:
 *           type: integer
 *           description: Minimum number of items that must be selected
 *           default: 1
 *           example: 1
 *         max_selections:
 *           type: integer
 *           description: Maximum number of items that can be selected (null for unlimited)
 *           example: 5
 *         category_id:
 *           type: string
 *           format: uuid
 *           description: Reference to the category this deal belongs to
 *           example: "c3f1ee-6c54-4b01-90e6-d701748f0852"
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the deal was created
 *           example: "2024-05-27T12:00:00Z"
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the deal was last updated
 *           example: "2024-05-28T15:30:00Z"
 *       example:
 *         id: "d290f1ee-6c54-4b01-90e6-d701748f0851"
 *         name: "Summer Special Combo"
 *         description: "Includes 2 large pizzas, garlic bread, and a 2L soda"
 *         price: 29.99
 *         image_url: "https://example.com/images/summer-special.jpg"
 *         discount_percentage: 15.5
 *         is_active: true
 *         valid_from: "2024-06-01T00:00:00Z"
 *         valid_to: "2024-08-31T23:59:59Z"
 *         min_selections: 1
 *         max_selections: 5
 *         category_id: "c3f1ee-6c54-4b01-90e6-d701748f0852"
 *         created_at: "2024-05-27T12:00:00Z"
 *         updated_at: "2024-05-28T15:30:00Z"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     DealRelationships:
 *       type: object
 *       description: Relationship definitions for Deal model
 *       properties:
 *         associations:
 *           type: object
 *           properties:
 *             Category:
 *               type: string
 *               description: The category this deal belongs to (via category_id)
 *             DealItems:
 *               type: array
 *               description: List of items included in this deal
 *               items:
 *                 $ref: '#/components/schemas/DealItem'
 *             Branches:
 *               type: array
 *               description: Branches where this deal is available
 *               items:
 *                 $ref: '#/components/schemas/Branch'
 *       example:
 *         associations:
 *           Category: "Pizza Combos"
 *           DealItems:
 *             - { item_id: "i290f1ee-6c54-4b01-90e6-d701748f0851", quantity: 2 }
 *             - { item_id: "i390f1ee-6c54-4b01-90e6-d701748f0852", quantity: 1 }
 *           Branches:
 *             - { id: "b290f1ee-6c54-4b01-90e6-d701748f0851", name: "Downtown Branch" }
 *             - { id: "b390f1ee-6c54-4b01-90e6-d701748f0852", name: "Uptown Branch" }
 */

/**
 * @swagger
 * tags:
 *   - name: Deals
 *     description: Restaurant deal management
 *   - name: Deal Items
 *     description: Management of items within deals
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Deal:
 *       type: object
 *       required:
 *         - name
 *         - price
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "550e8400-e29b-41d4-a716-446655440000"
 *         name:
 *           type: string
 *           example: "Summer Special Combo"
 *         description:
 *           type: string
 *           example: "Includes 2 large pizzas and drinks"
 *         price:
 *           type: number
 *           format: float
 *           example: 29.99
 *         discount_percentage:
 *           type: number
 *           format: float
 *           example: 15.5
 *         image_url:
 *           type: string
 *           example: "https://example.com/images/summer-special.jpg"
 *         is_active:
 *           type: boolean
 *           default: true
 *           example: true
 *         valid_from:
 *           type: string
 *           format: date-time
 *           example: "2024-06-01T00:00:00Z"
 *         valid_to:
 *           type: string
 *           format: date-time
 *           example: "2024-08-31T23:59:59Z"
 *         min_selections:
 *           type: integer
 *           minimum: 1
 *           example: 1
 *         max_selections:
 *           type: integer
 *           minimum: 1
 *           example: 3
 *         category_id:
 *           type: string
 *           format: uuid
 *           example: "660e8400-e29b-41d4-a716-446655440000"
 *         created_at:
 *           type: string
 *           format: date-time
 *           example: "2024-05-01T12:00:00Z"
 *         updated_at:
 *           type: string
 *           format: date-time
 *           example: "2024-05-15T09:30:00Z"
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/DealItem'
 *
 *     DealItem:
 *       type: object
 *       required:
 *         - deal_id
 *         - item_id
 *         - item_type
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "770e8400-e29b-41d4-a716-446655440000"
 *         deal_id:
 *           type: string
 *           format: uuid
 *           example: "550e8400-e29b-41d4-a716-446655440000"
 *         item_id:
 *           type: string
 *           format: uuid
 *           example: "880e8400-e29b-41d4-a716-446655440000"
 *         item_type:
 *           type: string
 *           enum: [main, variant, addon]
 *           example: "main"
 *         is_required:
 *           type: boolean
 *           default: false
 *           example: true
 *         quantity:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *           example: 2
 *         price_override:
 *           type: number
 *           format: float
 *           example: 9.99
 *         created_at:
 *           type: string
 *           format: date-time
 *           example: "2024-05-01T12:00:00Z"
 *         updated_at:
 *           type: string
 *           format: date-time
 *           example: "2024-05-15T09:30:00Z"
 *         item:
 *           $ref: '#/components/schemas/Item'
 *         variant:
 *           $ref: '#/components/schemas/ItemVariant'
 *         addon:
 *           $ref: '#/components/schemas/ItemAddon'
 *
 *     DealValidation:
 *       type: object
 *       properties:
 *         isValid:
 *           type: boolean
 *           example: false
 *         errors:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Deal must have at least one required item"]
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           example: "Deal not found"
 */

/**
 * @swagger
 * /deals:
 *   post:
 *     summary: Create a new deal (with optional image upload)
 *     tags: [Deals]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: images
 *         type: file
 *         description: Deal image (max 1 file)
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               discount_percentage:
 *                 type: number
 *               is_active:
 *                 type: boolean
 *               valid_from:
 *                 type: string
 *                 format: date-time
 *               valid_to:
 *                 type: string
 *                 format: date-time
 *               min_selections:
 *                 type: integer
 *               max_selections:
 *                 type: integer
 *               category_id:
 *                 type: string
 *                 format: uuid
 *     responses:
 *       201:
 *         description: Deal created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Deal'
 *       400:
 *         description: Invalid input
 *
 *   get:
 *     summary: Get all deals with filtering options
 *     tags: [Deals]
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
 *           format: uuid
 *         description: Filter by category ID
 *       - in: query
 *         name: validNow
 *         schema:
 *           type: boolean
 *         description: Only return deals valid now
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
 *         description: List of deals
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Deal'
 */

/**
 * @swagger
 * /deals/{id}:
 *   get:
 *     summary: Get deal by ID
 *     tags: [Deals]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: query
 *         name: includeItems
 *         schema:
 *           type: boolean
 *         description: Include deal items
 *     responses:
 *       200:
 *         description: Deal details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Deal'
 *       404:
 *         description: Deal not found
 *
 *   put:
 *     summary: Update deal
 *     tags: [Deals]
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
 *             $ref: '#/components/schemas/Deal'
 *     responses:
 *       200:
 *         description: Updated deal
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Deal'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Deal not found
 *
 *   delete:
 *     summary: Delete (deactivate) deal
 *     tags: [Deals]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Deal deactivated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Deal deactivated successfully"
 *       404:
 *         description: Deal not found
 */

/**
 * @swagger
 * /deals/{id}/image:
 *   put:
 *     summary: Update deal image
 *     tags: [Deals]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: formData
 *         name: images
 *         type: file
 *         required: true
 *         description: New deal image (max 1 file)
 *     responses:
 *       200:
 *         description: Image updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Deal'
 *       400:
 *         description: No image provided
 *       404:
 *         description: Deal not found
 */

/**
 * @swagger
 * /deals/{id}/validate:
 *   get:
 *     summary: Validate deal configuration
 *     tags: [Deals]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Validation result
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DealValidation'
 *       404:
 *         description: Deal not found
 */

/**
 * @swagger
 * /deals/{id}/items:
 *   post:
 *     summary: Add item to deal
 *     tags: [Deal Items]
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
 *               - item_id
 *               - item_type
 *             properties:
 *               item_id:
 *                 type: string
 *                 format: uuid
 *               item_type:
 *                 type: string
 *                 enum: [main, variant, addon]
 *               is_required:
 *                 type: boolean
 *               quantity:
 *                 type: integer
 *               price_override:
 *                 type: number
 *     responses:
 *       201:
 *         description: Item added to deal
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DealItem'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Deal not found
 *
 *   get:
 *     summary: Get all items for a deal
 *     tags: [Deal Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: List of deal items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DealItem'
 *       404:
 *         description: Deal not found
 */

/**
 * @swagger
 * /deals/items/{itemId}:
 *   put:
 *     summary: Update deal item
 *     tags: [Deal Items]
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DealItem'
 *     responses:
 *       200:
 *         description: Updated deal item
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DealItem'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Deal item not found
 *
 *   delete:
 *     summary: Remove item from deal
 *     tags: [Deal Items]
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Item removed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Item removed from deal successfully"
 *       404:
 *         description: Deal item not found
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
