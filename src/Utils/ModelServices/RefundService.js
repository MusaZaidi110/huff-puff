const Refund = require("../../Models/PaymentManagement/Refund.Model");

const RefundService = {
  // Create a new refund record
  async createRefund(data) {
    return await Refund.create(data);
  },

  // Get all refunds with optional filters (e.g., status, payment_id)
  async getAllRefunds(filter = {}) {
    return await Refund.findAll({
      where: filter,
      order: [["created_at", "DESC"]],
    });
  },

  // Get a refund by ID
  async getRefundById(id) {
    const refund = await Refund.findByPk(id);
    if (!refund) throw new Error("Refund not found");
    return refund;
  },

  // Update a refund by ID
  async updateRefund(id, data) {
    const refund = await Refund.findByPk(id);
    if (!refund) throw new Error("Refund not found");
    await refund.update(data);
    return refund;
  },

  // Delete a refund by ID
  async deleteRefund(id) {
    const refund = await Refund.findByPk(id);
    if (!refund) throw new Error("Refund not found");
    await refund.destroy();
    return { message: "Refund deleted successfully" };
  },

  // Get refunds by payment ID
  async getRefundsByPaymentId(payment_id) {
    return await Refund.findAll({
      where: { payment_id },
      order: [["created_at", "DESC"]],
    });
  },
};

module.exports = RefundService;
