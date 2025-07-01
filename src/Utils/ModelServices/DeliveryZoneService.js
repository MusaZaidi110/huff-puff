const DeliveryZone = require("../../Models/DeliveryManagement/DeliveryZone.Model");

const DeliveryZoneService = {
  // Create a new DeliveryZone
  async createDeliveryZone(data) {
    return await DeliveryZone.create(data);
  },

  // Get all DeliveryZones, optionally filtered by branch_id
  async getAllDeliveryZones(filters = {}) {
    const where = {};
    if (filters.branch_id) where.branch_id = filters.branch_id;

    return await DeliveryZone.findAll({ where });
  },

  // Get a DeliveryZone by ID, optionally including the Branch association
  async getDeliveryZoneById(id, includeBranch = false) {
    const include = includeBranch ? ["Branch"] : [];
    return await DeliveryZone.findByPk(id, { include });
  },

  // Update a DeliveryZone by ID
  async updateDeliveryZone(id, data) {
    const deliveryZone = await DeliveryZone.findByPk(id);
    if (!deliveryZone) throw new Error("DeliveryZone not found");
    await deliveryZone.update(data);
    return deliveryZone;
  },

  // Delete a DeliveryZone by ID
  async deleteDeliveryZone(id) {
    const deliveryZone = await DeliveryZone.findByPk(id);
    if (!deliveryZone) throw new Error("DeliveryZone not found");
    await deliveryZone.destroy();
    return { message: "DeliveryZone deleted successfully" };
  },
};

module.exports = DeliveryZoneService;
