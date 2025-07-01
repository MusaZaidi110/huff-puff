const DeviceToken = require("../../Models/Notification/DeviceToken.Model");
const User = require("../../Models/UserManagement/User.Model");

const DeviceTokenService = {
  // Create a new device token
  async createDeviceToken(data) {
    return await DeviceToken.create(data);
  },

  // Get all device tokens (optionally only active ones)
  async getAllDeviceTokens({ activeOnly = false } = {}) {
    const where = activeOnly ? { is_active: true } : {};
    return await DeviceToken.findAll({
      where,
      include: [{ model: User }],
      order: [["created_at", "DESC"]],
    });
  },

  // Get a device token by ID
  async getDeviceTokenById(id) {
    const token = await DeviceToken.findByPk(id, { include: [{ model: User }] });
    if (!token) {
      throw new Error("DeviceToken not found");
    }
    return token;
  },

  // Update device token by ID
  async updateDeviceToken(id, data) {
    const token = await DeviceToken.findByPk(id);
    if (!token) {
      throw new Error("DeviceToken not found");
    }
    await token.update(data);
    return token;
  },

  // Soft delete (deactivate) device token by ID
  async deactivateDeviceToken(id) {
    const token = await DeviceToken.findByPk(id);
    if (!token) {
      throw new Error("DeviceToken not found");
    }
    token.is_active = false;
    await token.save();
    return token;
  },

  // Hard delete device token by ID
  async deleteDeviceToken(id) {
    const token = await DeviceToken.findByPk(id);
    if (!token) {
      throw new Error("DeviceToken not found");
    }
    await token.destroy();
    return { message: "DeviceToken deleted successfully" };
  },

  // Get all device tokens for a specific user
  async getTokensByUserId(user_id) {
    return await DeviceToken.findAll({
      where: { user_id, is_active: true },
      include: [{ model: User }],
    });
  },
};

module.exports = DeviceTokenService;
