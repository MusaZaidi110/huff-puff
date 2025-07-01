const admin = require("firebase-admin");
const serviceAccount = require("./Configs/huffandpuffburger-firebase-adminsdk-fbsvc-7e760bb618.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

class NotificationService {
  /**
   * Send notification to devices (Android/iOS)
   * @param {string|string[]} deviceTokens - Single token or array of tokens
   * @param {string} type - Notification type (PROMOTION, ORDER_UPDATE, etc.)
   * @param {string} title - Notification title (for system notifications)
   * @param {string} body - Notification body (for system notifications)
   * @param {Object} [data] - Custom data payload (for in-app handling)
   * @param {boolean} [silent=false] - If true, sends data-only (in-app) notification
   */
  static async sendNotification(deviceTokens, type, title = "", body = "", data = {}, silent = false) {
    const notificationTypes = {
      USER_UPDATE: {priority: "high", click_action: "OPEN_PROFILE"},
      LOYALTY_POINTS: {priority: "high", click_action: "LOYALTY_POINTS"},
      MANU_ITEM_UPDATE: {priority: "high", click_action: "MANU_ITEM_UPDATE"}, 
      PROMOTION: { priority: "high", click_action: "OPEN_PROMOTION" },
      ORDER_UPDATE: { priority: "high", click_action: "OPEN_ORDER_DETAILS" },
      PAYMENT: { priority: "high", click_action: "OPEN_PAYMENT_DETAILS" },
      DEFAULT: { priority: "normal", click_action: "OPEN_APP" },
    };

    const config = notificationTypes[type] || notificationTypes.DEFAULT;

    const message = {
      ...(!silent && {
        notification: { title, body },
      }),
      data: {
        ...data,
        notification_type: type,
        click_action: config.click_action,
        ...(silent && { title, body }),
      },
      android: {
        priority: config.priority,
        ...(silent && { notification: null }),
      },
      apns: {
        payload: {
          aps: silent
            ? { "content-available": 1 }
            : {
                alert: { title, body },
                sound: "default",
              },
        },
      },
    };

    const tokens = Array.isArray(deviceTokens) ? deviceTokens : [deviceTokens];

    try {
      if (tokens.length > 1) {
        const response = await admin.messaging().sendMulticast({ ...message, tokens });
        return {
          success: response.successCount > 0,
          successCount: response.successCount,
          failureCount: response.failureCount,
        };
      } else {
        await admin.messaging().send({ ...message, token: tokens[0] });
        return { success: true };
      }
    } catch (error) {
      console.error("FCM Error:", error);
      return { success: false, error: error.message };
    }
  }
}

module.exports = NotificationService;



// ================= USAGE EXAMPLES ================= //

// 1. System notification (shows in tray) with custom data
/*
NotificationService.sendNotification(
  "device_token_123", 
  "PROMOTION",
  "Special Offer!", 
  "Get 20% off today",
  { 
    url: "https://example.com/promo",
    image: "https://example.com/promo.jpg",
    promo_id: "123" 
  }
);
*/

// 2. In-app data-only notification (no system tray display)
/*
NotificationService.sendNotification(
  ["token1", "token2"],
  "ORDER_UPDATE",
  "", // Title not needed for silent
  "", // Body not needed for silent
  {
    order_id: "123",
    status: "shipped",
    deep_link: "myapp://orders/123",
    timestamp: new Date().toISOString()
  },
  true // Silent flag
);
*/

// 3. Notification with URL that opens when clicked
/*
NotificationService.sendNotification(
  "device_token_xyz",
  "PAYMENT",
  "Payment Received",
  "Your payment of $20 was processed",
  {
    url: "myapp://payment/123",
    payment_id: "123",
    amount: "20.00"
  }
);
*/
