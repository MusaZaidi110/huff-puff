const PushNotification = require("../../Models/Notification/PushNotification.Model");
const User = require("../../Models/UserManagement/User.Model");

const PushNotificationService = {
  // Create a new push notification
  async createNotification(data) {
    return await PushNotification.create(data);
  },

  // Get all notifications (optionally filter unread only)
  async getAllNotifications({ unreadOnly = false } = {}) {
    const where = unreadOnly ? { is_read: false } : {};
    return await PushNotification.findAll({
      where,
      include: [{ model: User }],
      order: [["created_at", "DESC"]],
    });
  },

  // Get notifications for a specific user
  async getNotificationsByUserId(user_id, { unreadOnly = false } = {}) {
    const where = { user_id };
    if (unreadOnly) {
      where.is_read = false;
    }
    return await PushNotification.findAll({
      where,
      order: [["created_at", "DESC"]],
    });
  },

  // Get a single notification by ID
  async getNotificationById(id) {
    const notification = await PushNotification.findByPk(id);
    if (!notification) {
      throw new Error("PushNotification not found");
    }
    return notification;
  },

  // Mark a notification as read by ID
  async markAsRead(id) {
    const notification = await PushNotification.findByPk(id);
    if (!notification) {
      throw new Error("PushNotification not found");
    }
    notification.is_read = true;
    await notification.save();
    return notification;
  },

  // Update a notification by ID
  async updateNotification(id, data) {
    const notification = await PushNotification.findByPk(id);
    if (!notification) {
      throw new Error("PushNotification not found");
    }
    await notification.update(data);
    return notification;
  },

  // Delete a notification by ID (hard delete)
  async deleteNotification(id) {
    const notification = await PushNotification.findByPk(id);
    if (!notification) {
      throw new Error("PushNotification not found");
    }
    await notification.destroy();
    return { message: "PushNotification deleted successfully" };
  },
};

module.exports = PushNotificationService;
