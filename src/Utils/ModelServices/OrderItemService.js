const OrderItem = require("../../Models/OrderManagement/OrderItem.Model");

const OrderItemService = {
  // Create a new OrderItem
  async createOrderItem(data) {
    return await OrderItem.create(data);
  },

  // Get all OrderItems (optionally filter by order_id)
  async getAllOrderItems(filter = {}) {
    return await OrderItem.findAll({ where: filter, order: [["created_at", "DESC"]] });
  },

  // Get OrderItem by ID with associations
  async getOrderItemById(id, includeAssociations = true) {
    const include = includeAssociations
      ? [
          "Order",
          "Item",
          "ItemVariant",
          "OrderItemAddons",
          "Deal",
        ]
      : [];

    const orderItem = await OrderItem.findByPk(id, { include });
    if (!orderItem) throw new Error("OrderItem not found");
    return orderItem;
  },

  // Update an OrderItem by ID
  async updateOrderItem(id, data) {
    const orderItem = await OrderItem.findByPk(id);
    if (!orderItem) throw new Error("OrderItem not found");
    await orderItem.update(data);
    return orderItem;
  },

  // Delete an OrderItem by ID
  async deleteOrderItem(id) {
    const orderItem = await OrderItem.findByPk(id);
    if (!orderItem) throw new Error("OrderItem not found");
    await orderItem.destroy();
    return { message: "OrderItem deleted successfully" };
  },

  // Get all OrderItems by order ID
  async getOrderItemsByOrderId(order_id) {
    return await OrderItem.findAll({
      where: { order_id },
      order: [["created_at", "DESC"]],
    });
  },
};

module.exports = OrderItemService;
