/**
 * @swagger
 * components:
 *   schemas:
 *     Banner:
 *       type: object
 *       description: Represents a banner used for promotions, sliders, or visual display in the application.
 *       required:
 *         - id
 *         - title
 *         - banners_type
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Unique identifier for the banner.
 *           example: "a3d93f2a-36b2-4217-a6c7-4fd42310967e"

 *         title:
 *           type: string
 *           description: Title of the banner.
 *           example: "Summer Sale 2025"

 *         description:
 *           type: string
 *           description: Optional description of the banner.
 *           example: "Get up to 50% off on selected items this summer!"

 *         image_url:
 *           type: string
 *           description: URL to the banner image.
 *           example: "https://cdn.example.com/banners/summer-sale.webp"

 *         video_url:
 *           type: string
 *           description: URL to the banner video if applicable.
 *           example: "https://cdn.example.com/videos/banner-bg.mp4"

 *         banners_type:
 *           type: string
 *           enum: [home_slider, category_banners, promotional, video_background]
 *           description: The purpose or location type of the banner.
 *           example: "home_slider"

 *         target_url:
 *           type: string
 *           description: URL to which the user will be redirected when the banner is clicked.
 *           example: "https://example.com/sale"

 *         display_order:
 *           type: integer
 *           description: Order in which the banner appears (lower is higher priority).
 *           example: 1

 *         start_date:
 *           type: string
 *           format: date-time
 *           description: Optional start date when the banner becomes visible.
 *           example: "2025-06-01T00:00:00Z"

 *         end_date:
 *           type: string
 *           format: date-time
 *           description: Optional end date when the banner should be removed.
 *           example: "2025-06-30T23:59:59Z"

 *         is_active:
 *           type: boolean
 *           description: Indicates if the banner is currently active and visible.
 *           example: true

 *         branch_id:
 *           type: string
 *           format: uuid
 *           description: ID of the branch this banner is associated with, if branch-specific.
 *           example: "f29d8c0f-95b4-4653-9e15-4a8e34b4f011"

 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the banner was created.
 *           readOnly: true
 *           example: "2025-05-30T12:00:00Z"

 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the banner was last updated.
 *           readOnly: true
 *           example: "2025-05-31T09:30:00Z"

 *   parameters:
 *     bannerId:
 *       in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: string
 *         format: uuid
 *       description: UUID of the banner.
 *       example: "a3d93f2a-36b2-4217-a6c7-4fd42310967e"
 */
