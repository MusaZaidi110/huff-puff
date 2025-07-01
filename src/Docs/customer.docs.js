/**
 * @swagger
 * components:
 *   schemas:
 *     Customer:
 *       type: object
 *       description: Represents a customer profile associated with a user account, including loyalty, referral, and payment info.
 *       required:
 *         - id
 *         - loyalty_points
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Unique identifier for the customer.
 *           example: "58c93f21-7199-4e29-9b24-f87692be002e"

 *         user_id:
 *           type: string
 *           format: uuid
 *           description: ID of the user this customer profile is linked to.
 *           example: "e122ef50-8b01-46cd-9751-435ba346e3d5"

 *         loyalty_points:
 *           type: integer
 *           description: Number of loyalty points the customer has earned.
 *           example: 120

 *         referral_code:
 *           type: string
 *           description: Unique code used to refer others or track referrals.
 *           example: "REF123ABC"

 *         referred_by:
 *           type: string
 *           format: uuid
 *           nullable: true
 *           description: ID of another customer who referred this customer.
 *           example: "a5c9c3b2-98df-4c45-a762-5240b4c0b44a"

 *         preferred_branch_id:
 *           type: string
 *           format: uuid
 *           nullable: true
 *           description: ID of the customer's preferred branch.
 *           example: "b193c4a1-d8c2-4e3f-9a5b-8f505fc41e6f"

 *         stripe_customer_id:
 *           type: string
 *           description: Customer ID from Stripe used for payment processing.
 *           example: "cus_PaJcnbL41eFVDp"

 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Date and time when the customer record was created.
 *           example: "2025-05-30T08:00:00Z"

 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Date and time when the customer record was last updated.
 *           example: "2025-05-30T08:30:00Z"
 */
