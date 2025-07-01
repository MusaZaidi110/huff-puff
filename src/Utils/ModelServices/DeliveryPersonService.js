const DeliveryPerson = require("../../Models/UserManagement/DeliveryPerson.Model");

const DeliveryPersonService = {
  // Create a new delivery person
  async create(data) {
    return await DeliveryPerson.create(data);
  },

  // Find delivery person by ID
  async findById(id) {
    return await DeliveryPerson.findByPk(id);
  },

  // Find delivery persons by branch ID
  async findByBranch(branchId) {
    return await DeliveryPerson.findAll({ where: { branch_id: branchId } });
  },

  // Update delivery person by ID
  async update(id, data) {
    const deliveryPerson = await DeliveryPerson.findByPk(id);
    if (!deliveryPerson) throw new Error("DeliveryPerson not found");
    return await deliveryPerson.update(data);
  },

  // Delete delivery person by ID
  async delete(id) {
    return await DeliveryPerson.destroy({ where: { id } });
  },

  // Update availability status
  async updateAvailability(id, status) {
    const deliveryPerson = await DeliveryPerson.findByPk(id);
    if (!deliveryPerson) throw new Error("DeliveryPerson not found");
    if (!["available", "busy", "offline"].includes(status)) {
      throw new Error("Invalid availability status");
    }
    deliveryPerson.availability_status = status;
    await deliveryPerson.save();
    return deliveryPerson;
  },

  // Update location
  async updateLocation(id, location) {
    const deliveryPerson = await DeliveryPerson.findByPk(id);
    if (!deliveryPerson) throw new Error("DeliveryPerson not found");
    deliveryPerson.location = location;
    await deliveryPerson.save();
    return deliveryPerson;
  },

  // Find all available delivery persons nearby within a radius (optional example)
  async findAvailableNearby(branchId, radiusMeters = 5000) {
    // Assuming PostGIS geography type and sequelize support for raw queries
    const query = `
      SELECT *
      FROM delivery_persons
      WHERE branch_id = :branchId
      AND availability_status = 'available'
      AND ST_DWithin(location, (SELECT location FROM branches WHERE id = :branchId), :radius)
    `;

    const results = await DeliveryPerson.sequelize.query(query, {
      replacements: { branchId, radius: radiusMeters },
      model: DeliveryPerson,
      mapToModel: true,
    });
    return results;
  },
};

module.exports = DeliveryPersonService;
