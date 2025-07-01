const Address = require("../../Models/UserManagement/Address.Model");

const AddressService = {
  // Create a new address
  async create(data) {
    return await Address.create(data);
  },

  // Get address by ID
  async findById(id) {
    return await Address.findByPk(id);
  },

  // Get all addresses for a specific user
  async findByUserId(userId) {
    return await Address.findAll({ where: { user_id: userId } });
  },

  // Update address by ID
  async update(id, data) {
    const address = await Address.findByPk(id);
    if (!address) throw new Error("Address not found");
    return await address.update(data);
  },

  // Delete address by ID
  async delete(id) {
    return await Address.destroy({ where: { id } });
  },

  // Set one address as default for the user and unset others
  async setDefaultAddress(userId, addressId) {
    const addresses = await Address.findAll({ where: { user_id: userId } });
    await Promise.all(
      addresses.map((address) =>
        address.update({ is_default: address.id === addressId })
      )
    );
    return await Address.findByPk(addressId);
  },
};

module.exports = AddressService;
