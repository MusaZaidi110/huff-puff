/**
 * @swagger
 * components:
 *   schemas:
 *     Staff:
 *       type: object
 *       description: Staff member details with position and permissions in a specific branch.
 *       required:
 *         - id
 *         - position
 *         - user_id
 *         - branch_id
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Unique identifier for the staff member.
 *           example: "f123e456-d789-1234-abcd-56789ef01234"
 *         
 *         position:
 *           type: string
 *           description: Job position or role of the staff member.
 *           example: "Store Manager"
 *         
 *         permissions:
 *           type: object
 *           description: JSON object containing permissions granted to the staff member.
 *           example: {
 *             "canEditProducts": true,
 *             "canViewOrders": true,
 *             "canManageUsers": false
 *           }
 *         
 *         user_id:
 *           type: string
 *           format: uuid
 *           description: The ID of the user associated with this staff record.
 *           example: "a987b654-c321-4def-9876-abcdef123456"
 *         
 *         branch_id:
 *           type: string
 *           format: uuid
 *           description: The ID of the branch this staff member belongs to.
 *           example: "b123c456-d789-4321-abcd-98765fedcba0"
 *         
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the staff record was created.
 *           example: "2025-05-30T09:00:00Z"
 *         
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the staff record was last updated.
 *           example: "2025-05-30T09:15:00Z"
 */
