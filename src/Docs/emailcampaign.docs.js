/**
 * @swagger
 * components:
 *   schemas:
 *     EmailCampaign:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - user_list_id
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Unique identifier for the email campaign (UUIDv4)
 *           example: "a3f47e9d-58b2-4d6b-a657-0d7b2f8d9f48"
 *         name:
 *           type: string
 *           description: Name of the email campaign
 *           example: "Spring Sale 2025 Campaign"
 *         user_list_id:
 *           type: string
 *           format: uuid
 *           description: Foreign key referencing the user list targeted by this campaign
 *           example: "f7e15c3d-62ab-4f1b-8d9e-c2b3a8d1aef7"
 *         is_active:
 *           type: boolean
 *           description: Indicates if the campaign is currently active
 *           default: true
 *           example: true
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the campaign record was created
 *           example: "2025-05-28T10:00:00Z"
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the campaign record was last updated
 *           example: "2025-05-29T12:00:00Z"
 */
