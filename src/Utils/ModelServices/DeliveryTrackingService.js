const DeliveryTracking = require("../../Models/DeliveryManagement/DeliveryTracking.Model");

const DeliveryTrackingService = {
  // Create a new DeliveryTracking record
  async createDeliveryTracking(data) {
    return await DeliveryTracking.create(data);
  },

  // Get all DeliveryTracking records, optionally filtered by delivery_person_id or user_id
  async getAllDeliveryTracking(filters = {}) {
    const where = {};
    if (filters.delivery_person_id) where.delivery_person_id = filters.delivery_person_id;
    if (filters.user_id) where.user_id = filters.user_id;

    return await DeliveryTracking.findAll({ where });
  },

  // Get a single DeliveryTracking record by ID, optionally with associations
  async getDeliveryTrackingById(id, includeAssociations = false) {
    const include = includeAssociations
      ? [
          "DeliveryPerson",
          "User",
        ]
      : [];
    return await DeliveryTracking.findByPk(id, { include });
  },

  // Update a DeliveryTracking record by ID
  async updateDeliveryTracking(id, data) {
    const deliveryTracking = await DeliveryTracking.findByPk(id);
    if (!deliveryTracking) throw new Error("DeliveryTracking record not found");
    await deliveryTracking.update(data);
    return deliveryTracking;
  },

  // Delete a DeliveryTracking record by ID
  async deleteDeliveryTracking(id) {
    const deliveryTracking = await DeliveryTracking.findByPk(id);
    if (!deliveryTracking) throw new Error("DeliveryTracking record not found");
    await deliveryTracking.destroy();
    return { message: "DeliveryTracking record deleted successfully" };
  },
};

module.exports = DeliveryTrackingService;
