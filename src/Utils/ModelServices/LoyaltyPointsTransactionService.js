const LoyaltyPointsTransaction = require("../../Models/LoyaltySystem/LoyaltyPointTransfer.Model");

const LoyaltyPointsTransactionService = {
  // Create a transaction
  async create(data) {
    return await LoyaltyPointsTransaction.create(data);
  },

  // Get all transactions (optionally filtered by customer, type, source_type, etc.)
  async getAll(filter = {}) {
    const where = {};

    if (filter.customer_id) where.customer_id = filter.customer_id;
    if (filter.transaction_type) where.transaction_type = filter.transaction_type;
    if (filter.source_type) where.source_type = filter.source_type;

    return await LoyaltyPointsTransaction.findAll({ where });
  },

  // Get transaction by ID
  async getById(id) {
    return await LoyaltyPointsTransaction.findByPk(id);
  },

  // Get all transactions for a customer
  async getByCustomerId(customer_id) {
    return await LoyaltyPointsTransaction.findAll({
      where: { customer_id },
      order: [['created_at', 'DESC']],
    });
  },

  // Update a transaction
  async update(id, data) {
    const transaction = await LoyaltyPointsTransaction.findByPk(id);
    if (!transaction) throw new Error("LoyaltyPointsTransaction not found");
    return await transaction.update(data);
  },

  // Delete a transaction
  async delete(id) {
    const transaction = await LoyaltyPointsTransaction.findByPk(id);
    if (!transaction) throw new Error("LoyaltyPointsTransaction not found");
    await transaction.destroy();
    return { message: "Transaction deleted successfully" };
  },

  // Calculate total points for a customer (optional: by type)
  async getTotalPointsByCustomer(customer_id, type = null) {
    const where = { customer_id };
    if (type) where.transaction_type = type;

    const transactions = await LoyaltyPointsTransaction.findAll({ where });
    return transactions.reduce((sum, t) => sum + t.points, 0);
  },

  // Record an earning transaction
  async earnPoints(data) {
    return await LoyaltyPointsTransaction.create({
      ...data,
      transaction_type: "earned",
    });
  },

  // Record a redemption transaction
  async redeemPoints(data) {
    return await LoyaltyPointsTransaction.create({
      ...data,
      transaction_type: "redeemed",
    });
  },
};

module.exports = LoyaltyPointsTransactionService;
