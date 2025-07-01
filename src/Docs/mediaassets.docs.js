/**
 * @swagger
 * components:
 *   schemas:
 *     MediaAsset:
 *       type: object
 *       description: Represents a media file (image, video, etc.) stored in the system
 *       required:
 *         - id
 *         - url
 *         - type
 *         - filename
 *         - size
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Unique identifier for the media asset (UUIDv4 string)
 *           example: "550e8400-e29b-41d4-a716-446655440000"
 *         url:
 *           type: string
 *           maxLength: 2048
 *           format: uri
 *           description: Full URL to access the media file
 *           example: "https://example.com/uploads/images/550e8400e29b41d4a716446655440000.jpg"
 *         type:
 *           type: string
 *           maxLength: 50
 *           description: Media MIME type (e.g., image/jpeg, image/png, video/mp4)
 *           example: "image/jpeg"
 *         filename:
 *           type: string
 *           maxLength: 255
 *           description: Original filename of the uploaded file
 *           example: "product-image.jpg"
 *         size:
 *           type: integer
 *           format: int64
 *           minimum: 0
 *           description: File size in bytes
 *           example: 102400
 *         created_at:
 *           type: string
 *           format: date-time
 *           readOnly: true
 *           description: Timestamp when the media was uploaded
 *           example: "2023-01-01T12:00:00Z"
 *         updated_at:
 *           type: string
 *           format: date-time
 *           readOnly: true
 *           description: Timestamp when the media record was last updated
 *           example: "2023-01-01T12:00:00Z"
 * 
 *   parameters:
 *     mediaAssetId:
 *       in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: string
 *         format: uuid
 *       description: UUID of the media asset
 *       example: "550e8400-e29b-41d4-a716-446655440000"
 *     mediaTypeFilter:
 *       in: query
 *       name: type
 *       schema:
 *         type: string
 *       description: Filter by media MIME type (e.g., image/jpeg)
 *       example: "image/jpeg"
 */
