const Order = require("../../Models/OrderManagement/Order.Model");
const { Op } = require("sequelize");

const OrderService = {
  // Create a new Order
  async createOrder(data) {
    return await Order.create(data);
  },

  // Get all Orders (optionally filter by status)
  async getAllOrders({ status } = {}) {
    const where = {};
    if (status) where.status = status;
    return await Order.findAll({ where, order: [["created_at", "DESC"]] });
  },

  // Get Order by ID with associations (optional eager loading)
  async getOrderById(id, includeAssociations = true) {
    const include = includeAssociations
      ? [
          "Customer",
          "Branch",
          { association: "DeliveryAddress" },
          "DeliveryPerson",
          "OrderItems",
          "OrderStatusHistories",
          "Payment",
          "Promotion",
          "PromotionRedemptions",
        ]
      : [];

    const order = await Order.findByPk(id, { include });
    if (!order) throw new Error("Order not found");
    return order;
  },

  // Update an Order by ID
  async updateOrder(id, data) {
    const order = await Order.findByPk(id);
    if (!order) throw new Error("Order not found");
    await order.update(data);
    return order;
  },

  // Delete an Order by ID (hard delete)
  async deleteOrder(id) {
    const order = await Order.findByPk(id);
    if (!order) throw new Error("Order not found");
    await order.destroy();
    return { message: "Order deleted successfully" };
  },

  // Get all orders for a specific customer
  async getOrdersByCustomerId(customer_id) {
    return await Order.findAll({
      where: { customer_id },
      order: [["created_at", "DESC"]],
    });
  },

  // Get all orders for a specific branch
  async getOrdersByBranchId(branch_id) {
    return await Order.findAll({
      where: { branch_id },
      order: [["created_at", "DESC"]],
    });
  },

  // Get all orders by status and optionally by date range
  async getOrdersByStatusAndDateRange(status, startDate, endDate) {
    const where = { status };
    if (startDate && endDate) {
      where.created_at = {
        [Op.between]: [startDate, endDate],
      };
    }
    return await Order.findAll({ where, order: [["created_at", "DESC"]] });
  },
};

module.exports = OrderService;
