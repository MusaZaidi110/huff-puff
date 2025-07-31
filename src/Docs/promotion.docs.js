/**
 * @swagger
 * tags:
 *   name: Promotions
 *   description: Promotion management system
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Promotion:
 *       type: object
 *       required:
 *         - name
 *         - discountType
 *         - discountValue
 *         - startDate
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Auto-generated promotion ID
 *         name:
 *           type: string
 *           description: Promotion name
 *         description:
 *           type: string
 *           description: Promotion description
 *         discountType:
 *           type: string
 *           enum: [percentage, fixed_amount, buy_x_get_y]
 *           description: Type of discount
 *         discountValue:
 *           type: number
 *           format: float
 *           description: Discount amount/percentage
 *         minOrderAmount:
 *           type: number
 *           format: float
 *           description: Minimum order amount for promotion
 *         maxDiscountAmount:
 *           type: number
 *           format: float
 *           description: Maximum discount amount
 *         startDate:
 *           type: string
 *           format: date-time
 *           description: When promotion starts
 *         endDate:
 *           type: string
 *           format: date-time
 *           description: When promotion ends
 *         isActive:
 *           type: boolean
 *           default: true
 *           description: Whether promotion is active
 *         imageUrl:
 *           type: string
 *           description: Promotion image URL
 *         code:
 *           type: string
 *           description: Promotion code
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Item'
 *       example:
 *         id: 3fa85f64-5717-4562-b3fc-2c963f66afa6
 *         name: "Summer Sale"
 *         description: "50% off all summer items"
 *         discountType: "percentage"
 *         discountValue: 50
 *         minOrderAmount: 0
 *         maxDiscountAmount: 20
 *         startDate: "2023-06-01T00:00:00Z"
 *         endDate: "2023-08-31T23:59:59Z"
 *         isActive: true
 *         imageUrl: "https://example.com/promotions/summer-sale.jpg"
 *         code: "SUMMER50"

 *     PromotionCreate:
 *       type: object
 *       required:
 *         - name
 *         - discountType
 *         - discountValue
 *         - startDate
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         discountType:
 *           type: string
 *           enum: [percentage, fixed_amount, buy_x_get_y]
 *         discountValue:
 *           type: number
 *           format: float
 *         minOrderAmount:
 *           type: number
 *           format: float
 *         maxDiscountAmount:
 *           type: number
 *           format: float
 *         startDate:
 *           type: string
 *           format: date-time
 *         endDate:
 *           type: string
 *           format: date-time
 *         isActive:
 *           type: boolean
 *         code:
 *           type: string
 *       example:
 *         name: "Summer Sale"
 *         description: "50% off all summer items"
 *         discountType: "percentage"
 *         discountValue: 50
 *         minOrderAmount: 0
 *         maxDiscountAmount: 20
 *         startDate: "2023-06-01T00:00:00Z"
 *         endDate: "2023-08-31T23:59:59Z"
 *         isActive: true
 *         code: "SUMMER50"

 *     PromotionUpdate:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         discountType:
 *           type: string
 *           enum: [percentage, fixed_amount, buy_x_get_y]
 *         discountValue:
 *           type: number
 *           format: float
 *         minOrderAmount:
 *           type: number
 *           format: float
 *         maxDiscountAmount:
 *           type: number
 *           format: float
 *         startDate:
 *           type: string
 *           format: date-time
 *         endDate:
 *           type: string
 *           format: date-time
 *         isActive:
 *           type: boolean
 *         code:
 *           type: string

 *     PromotionItem:
 *       type: object
 *       properties:
 *         promotionId:
 *           type: string
 *           format: uuid
 *         itemId:
 *           type: string
 *           format: uuid
 *         createdAt:
 *           type: string
 *           format: date-time

 *     ErrorResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string

 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /promotions:
 *   post:
 *     summary: Create a new promotion (Admin)
 *     tags: [Promotions]
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: image
 *         type: file
 *         description: Promotion image
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               discountType:
 *                 type: string
 *               discountValue:
 *                 type: number
 *               minOrderAmount:
 *                 type: number
 *               maxDiscountAmount:
 *                 type: number
 *               startDate:
 *                 type: string
 *               endDate:
 *                 type: string
 *               isActive:
 *                 type: boolean
 *               code:
 *                 type: string
 *     responses:
 *       201:
 *         description: Promotion created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Promotion'
 *       400:
 *         description: Invalid request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /promotions/active:
 *   get:
 *     summary: Get active promotions
 *     tags: [Promotions]
 *     responses:
 *       200:
 *         description: List of active promotions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Promotion'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /promotions/{id}:
 *   get:
 *     summary: Get promotion by ID
 *     tags: [Promotions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Promotion ID
 *     responses:
 *       200:
 *         description: Promotion details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Promotion'
 *       404:
 *         description: Promotion not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /promotions/{id}:
 *   put:
 *     summary: Update promotion (Admin)
 *     tags: [Promotions]
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Promotion ID
 *       - in: formData
 *         name: image
 *         type: file
 *         description: New promotion image
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               discountType:
 *                 type: string
 *               discountValue:
 *                 type: number
 *               minOrderAmount:
 *                 type: number
 *               maxDiscountAmount:
 *                 type: number
 *               startDate:
 *                 type: string
 *               endDate:
 *                 type: string
 *               isActive:
 *                 type: boolean
 *               code:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated promotion
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Promotion'
 *       400:
 *         description: Invalid request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Promotion not found
 */

/**
 * @swagger
 * /promotions/{id}/toggle-status:
 *   patch:
 *     summary: Toggle promotion status (Admin)
 *     tags: [Promotions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Promotion ID
 *     responses:
 *       200:
 *         description: Promotion status toggled
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Promotion'
 *       400:
 *         description: Invalid request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Promotion not found
 */

/**
 * @swagger
 * /promotions/{id}/items/{itemId}:
 *   post:
 *     summary: Add item to promotion (Admin)
 *     tags: [Promotions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Promotion ID
 *       - in: path
 *         name: itemId
 *         schema:
 *           type: string
 *         required: true
 *         description: Item ID to add
 *     responses:
 *       201:
 *         description: Item added to promotion
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PromotionItem'
 *       400:
 *         description: Invalid request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Promotion or item not found
 */

/**
 * @swagger
 * /promotions/{id}/items/{itemId}:
 *   delete:
 *     summary: Remove item from promotion (Admin)
 *     tags: [Promotions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Promotion ID
 *       - in: path
 *         name: itemId
 *         schema:
 *           type: string
 *         required: true
 *         description: Item ID to remove
 *     responses:
 *       200:
 *         description: Item removed from promotion
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Item removed from promotion
 *       400:
 *         description: Invalid request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Promotion or item not found
 */