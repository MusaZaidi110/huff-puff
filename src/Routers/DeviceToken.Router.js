const express = require("express");
const router = express.Router();
const {CreateDeviceToken} = require("../Functionality/UserDevice/StoreDeviceToken")

router.route("/create").post(CreateDeviceToken);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Device Tokens
 *   description: Management of device tokens for push notifications
 */

/**
 * @swagger
 * /device-token/create:
 *   post:
 *     summary: Create or update a device token
 *     description: |
 *       Stores or updates a device token for push notifications.
 *       If the token already exists, it updates the associated user ID and type.
 *       If not, it creates a new device token record.
 *     tags: [Device Tokens]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - token
 *               - type
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 123
 *                 description: ID of the user associated with this device
 *               token:
 *                 type: string
 *                 example: "device-token-abc123"
 *                 description: Unique device token for push notifications
 *               type:
 *                 type: string
 *                 enum: [ios, android]
 *                 example: "ios"
 *                 description: Type of device
 *     responses:
 *       200:
 *         description: Device token successfully stored/updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Device token processed successfully
 *       400:
 *         description: Bad request - missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Missing required fields (userId, token, type)
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */