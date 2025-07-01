const OrderStatusHistory = require("../../Models/OrderManagement/OrderStatusHistory.Model");

const OrderStatusHistoryService = {
  // Create a new OrderStatusHistory record
  async createStatusHistory(data) {
    return await OrderStatusHistory.create(data);
  },

  // Get all status history records, optionally filtered by order_id
  async getAllStatusHistories(filter = {}) {
    return await OrderStatusHistory.findAll({
      where: filter,
      order: [["created_at", "DESC"]],
    });
  },

  // Get a single status history by ID with optional associations
  async getStatusHistoryById(id, includeAssociations = true) {
    const include = includeAssociations
      ? ["Order", "Staff", "DeliveryPerson"]
      : [];

    const statusHistory = await OrderStatusHistory.findByPk(id, { include });
    if (!statusHistory) throw new Error("OrderStatusHistory not found");
    return statusHistory;
  },

  // Update an OrderStatusHistory record by ID
  async updateStatusHistory(id, data) {
    const statusHistory = await OrderStatusHistory.findByPk(id);
    if (!statusHistory) throw new Error("OrderStatusHistory not found");
    await statusHistory.update(data);
    return statusHistory;
  },

  // Delete an OrderStatusHistory record by ID
  async deleteStatusHistory(id) {
    const statusHistory = await OrderStatusHistory.findByPk(id);
    if (!statusHistory) throw new Error("OrderStatusHistory not found");
    await statusHistory.destroy();
    return { message: "OrderStatusHistory deleted successfully" };
  },

  // Get all status histories for a specific order
  async getStatusHistoriesByOrderId(order_id) {
    return await OrderStatusHistory.findAll({
      where: { order_id },
      order: [["created_at", "DESC"]],
    });
  },
};

module.exports = OrderStatusHistoryService;
