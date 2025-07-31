/**
 * @swagger
 * tags:
 *   name: Banners
 *   description: Banner management for promotions
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Banner:
 *       type: object
 *       required:
 *         - title
 *         - banners_type
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Auto-generated banner ID
 *         title:
 *           type: string
 *           description: Banner title/heading
 *         description:
 *           type: string
 *           description: Banner description
 *         banners_type:
 *           type: string
 *           enum: [homepage, category, promotion, featured]
 *           description: Type of banner
 *         image_url:
 *           type: string
 *           description: URL of banner image
 *         video_url:
 *           type: string
 *           description: URL of banner video
 *         link_url:
 *           type: string
 *           description: URL the banner links to
 *         display_order:
 *           type: integer
 *           description: Display priority (lower numbers appear first)
 *         is_active:
 *           type: boolean
 *           default: true
 *           description: Whether banner is currently active
 *         start_date:
 *           type: string
 *           format: date-time
 *           description: When banner should start appearing
 *         end_date:
 *           type: string
 *           format: date-time
 *           description: When banner should stop appearing
 *         branch_id:
 *           type: string
 *           format: uuid
 *           description: Specific branch this banner applies to
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: When banner was created
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: When banner was last updated
 *       example:
 *         id: 3fa85f64-5717-4562-b3fc-2c963f66afa6
 *         title: "Summer Sale"
 *         description: "50% off all summer items"
 *         banners_type: "promotion"
 *         image_url: "https://example.com/banners/summer-sale.jpg"
 *         link_url: "/promotions/summer-sale"
 *         display_order: 1
 *         is_active: true
 *         start_date: "2023-06-01T00:00:00Z"
 *         end_date: "2023-08-31T23:59:59Z"
 *         branch_id: "3fa85f64-5717-4562-b3fc-2c963f66afa7"
 * 
 *     BannerCreate:
 *       type: object
 *       required:
 *         - title
 *         - banners_type
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         banners_type:
 *           type: string
 *           enum: [homepage, category, promotion, featured]
 *         link_url:
 *           type: string
 *         display_order:
 *           type: integer
 *         is_active:
 *           type: boolean
 *           default: true
 *         start_date:
 *           type: string
 *           format: date-time
 *         end_date:
 *           type: string
 *           format: date-time
 *         branch_id:
 *           type: string
 *           format: uuid
 *       example:
 *         title: "Summer Sale"
 *         description: "50% off all summer items"
 *         banners_type: "promotion"
 *         link_url: "/promotions/summer-sale"
 *         display_order: 1
 *         is_active: true
 *         start_date: "2023-06-01T00:00:00Z"
 *         end_date: "2023-08-31T23:59:59Z"
 * 
 *     BannerUpdate:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         banners_type:
 *           type: string
 *           enum: [homepage, category, promotion, featured]
 *         link_url:
 *           type: string
 *         display_order:
 *           type: integer
 *         is_active:
 *           type: boolean
 *         start_date:
 *           type: string
 *           format: date-time
 *         end_date:
 *           type: string
 *           format: date-time
 *         branch_id:
 *           type: string
 *           format: uuid
 * 
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 */

/**
 * @swagger
 * /banner:
 *   post:
 *     summary: Create a new banner
 *     tags: [Banners]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: media
 *         type: file
 *         description: Banner image or video file
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               media:
 *                 type: string
 *                 format: binary
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               banners_type:
 *                 type: string
 *               link_url:
 *                 type: string
 *               display_order:
 *                 type: integer
 *               is_active:
 *                 type: boolean
 *               start_date:
 *                 type: string
 *               end_date:
 *                 type: string
 *               branch_id:
 *                 type: string
 *     responses:
 *       201:
 *         description: Banner created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Banner'
 *       400:
 *         description: Invalid request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /banner:
 *   get:
 *     summary: Get banners with filters
 *     tags: [Banners]
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [homepage, category, promotion, featured]
 *         description: Filter by banner type
 *       - in: query
 *         name: active
 *         schema:
 *           type: boolean
 *           default: true
 *         description: Filter active/inactive banners
 *       - in: query
 *         name: branchId
 *         schema:
 *           type: string
 *         description: Filter by branch ID
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
 *         description: List of banners
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Banner'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /banner/{id}:
 *   get:
 *     summary: Get banner by ID
 *     tags: [Banners]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Banner ID
 *     responses:
 *       200:
 *         description: Banner details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Banner'
 *       404:
 *         description: Banner not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /banner/{id}:
 *   put:
 *     summary: Update a banner
 *     tags: [Banners]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Banner ID
 *       - in: formData
 *         name: media
 *         type: file
 *         description: New banner image or video file
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               media:
 *                 type: string
 *                 format: binary
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               banners_type:
 *                 type: string
 *               link_url:
 *                 type: string
 *               display_order:
 *                 type: integer
 *               is_active:
 *                 type: boolean
 *               start_date:
 *                 type: string
 *               end_date:
 *                 type: string
 *               branch_id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated banner
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Banner'
 *       400:
 *         description: Invalid request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Banner not found
 */

/**
 * @swagger
 * /banner/{id}:
 *   delete:
 *     summary: Delete a banner
 *     tags: [Banners]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Banner ID
 *     responses:
 *       200:
 *         description: Banner deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Banner deleted successfully
 *       400:
 *         description: Cannot delete banner
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Banner not found
 */