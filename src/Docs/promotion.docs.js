/**
 * @swagger
 * tags:
 *   name: Promotions
 *   description: API endpoints for managing and retrieving promotions
 */

/**
 * @swagger
 * /promotions:
 *   get:
 *     summary: Get all currently active promotions
 *     description: Returns a list of promotions that are currently active (based on current date/time and isActive flag)
 *     tags: [Promotions]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *         description: Maximum number of promotions to return (default is 10)
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           minimum: 0
 *         description: Number of promotions to skip for pagination
 *     responses:
 *       200:
 *         description: A list of active promotions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/PromotionWithItems'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                       description: Total number of active promotions
 *                       example: 15
 *                     limit:
 *                       type: integer
 *                       example: 10
 *                     offset:
 *                       type: integer
 *                       example: 0
 *       400:
 *         description: Invalid query parameters
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     PromotionWithItems:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "550e8400-e29b-41d4-a716-446655440000"
 *         name:
 *           type: string
 *           example: "Summer Special"
 *         description:
 *           type: string
 *           example: "Special summer discount on selected items"
 *         discountPercentage:
 *           type: number
 *           format: float
 *           example: 15.5
 *         startDate:
 *           type: string
 *           format: date-time
 *           example: "2024-06-01T00:00:00Z"
 *         endDate:
 *           type: string
 *           format: date-time
 *           example: "2024-08-31T23:59:59Z"
 *         isActive:
 *           type: boolean
 *           example: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2024-05-01T12:00:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2024-05-15T09:30:00Z"
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/PromotionItem'
 * 
 *     PromotionItem:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "660e8400-e29b-41d4-a716-446655440000"
 *         name:
 *           type: string
 *           example: "Premium Pizza"
 *         image_url:
 *           type: string
 *           example: "https://example.com/images/premium-pizza.jpg"
 * 
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         error:
 *           type: object
 *           properties:
 *             code:
 *               type: integer
 *               example: 400
 *             message:
 *               type: string
 *               example: "Invalid query parameters"
 *             details:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   field:
 *                     type: string
 *                     example: "limit"
 *                   issue:
 *                     type: string
 *                     example: "Must be between 1 and 100"
 */