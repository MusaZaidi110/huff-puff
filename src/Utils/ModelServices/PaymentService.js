const Payment = require("../../Models/PaymentManagement/Payment.Model");

const PaymentService = {
  // Create a new payment record
  async createPayment(data) {
    return await Payment.create(data);
  },

  // Get all payments optionally filtered by criteria (e.g., order_id, status)
  async getAllPayments(filter = {}) {
    return await Payment.findAll({
      where: filter,
      order: [["created_at", "DESC"]],
    });
  },

  // Get payment by ID, optionally including associations
  async getPaymentById(id, includeAssociations = true) {
    const include = includeAssociations ? ["Order", "Refund"] : [];
    const payment = await Payment.findByPk(id, { include });
    if (!payment) throw new Error("Payment not found");
    return payment;
  },

  // Update a payment record by ID
  async updatePayment(id, data) {
    const payment = await Payment.findByPk(id);
    if (!payment) throw new Error("Payment not found");
    await payment.update(data);
    return payment;
  },

  // Delete a payment record by ID
  async deletePayment(id) {
    const payment = await Payment.findByPk(id);
    if (!payment) throw new Error("Payment not found");
    await payment.destroy();
    return { message: "Payment deleted successfully" };
  },

  // Get payments by order ID
  async getPaymentsByOrderId(order_id) {
    return await Payment.findAll({
      where: { order_id },
      order: [["created_at", "DESC"]],
    });
  },
};

module.exports = PaymentService;
