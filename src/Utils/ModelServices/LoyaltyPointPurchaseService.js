const LoyaltyPointPurchase = require("../../Models/LoyaltySystem/LoyaltyPointPurchase.Model");

const LoyaltyPointPurchaseService = {
  // Create a new loyalty point purchase
  async create(data) {
    return await LoyaltyPointPurchase.create(data);
  },

  // Get all purchases (optionally filtered by customer or status)
  async getAll(filter = {}) {
    const where = {};
    if (filter.customer_id) where.customer_id = filter.customer_id;
    if (filter.payment_status) where.payment_status = filter.payment_status;
    return await LoyaltyPointPurchase.findAll({ where });
  },

  // Get purchase by ID
  async getById(id) {
    return await LoyaltyPointPurchase.findByPk(id);
  },

  // Update a purchase
  async update(id, data) {
    const purchase = await LoyaltyPointPurchase.findByPk(id);
    if (!purchase) throw new Error("LoyaltyPointPurchase not found");
    return await purchase.update(data);
  },

  // Mark payment as completed
  async markPaymentCompleted(id, transaction_id = null) {
    const purchase = await LoyaltyPointPurchase.findByPk(id);
    if (!purchase) throw new Error("LoyaltyPointPurchase not found");
    return await purchase.update({
      payment_status: "completed",
      transaction_id: transaction_id || purchase.transaction_id,
    });
  },

  // Mark payment as failed
  async markPaymentFailed(id, transaction_id = null) {
    const purchase = await LoyaltyPointPurchase.findByPk(id);
    if (!purchase) throw new Error("LoyaltyPointPurchase not found");
    return await purchase.update({
      payment_status: "failed",
      transaction_id: transaction_id || purchase.transaction_id,
    });
  },

  // Delete a purchase
  async delete(id) {
    const purchase = await LoyaltyPointPurchase.findByPk(id);
    if (!purchase) throw new Error("LoyaltyPointPurchase not found");
    await purchase.destroy();
    return { message: "Purchase deleted successfully" };
  },
};

module.exports = LoyaltyPointPurchaseService;
