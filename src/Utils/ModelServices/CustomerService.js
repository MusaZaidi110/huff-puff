const Customer = require("../../Models/UserManagement/Customer.Model");

const CustomerService = {
  // Create a new customer
  async create(data) {
    return await Customer.create(data);
  },

  // Find customer by ID
  async findById(id) {
    return await Customer.findByPk(id);
  },

  // Find customer by user ID
  async findByUserId(userId) {
    return await Customer.findOne({ where: { user_id: userId } });
  },

  // Update customer by ID
  async update(id, data) {
    const customer = await Customer.findByPk(id);
    if (!customer) throw new Error("Customer not found");
    return await customer.update(data);
  },

  // Delete customer by ID
  async delete(id) {
    return await Customer.destroy({ where: { id } });
  },

  // Increment loyalty points
  async addLoyaltyPoints(id, points) {
    const customer = await Customer.findByPk(id);
    if (!customer) throw new Error("Customer not found");
    customer.loyalty_points += points;
    customer.loyalty_points_received += points;
    await customer.save();
    return customer;
  },

  // Deduct loyalty points (e.g., for purchase redemption)
  async deductLoyaltyPoints(id, points) {
    const customer = await Customer.findByPk(id);
    if (!customer) throw new Error("Customer not found");
    if (customer.loyalty_points < points) {
      throw new Error("Insufficient loyalty points");
    }
    customer.loyalty_points -= points;
    await customer.save();
    return customer;
  },
};

module.exports = CustomerService;
