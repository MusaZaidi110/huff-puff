const OrderItemAddon = require("../../Models/OrderManagement/OrderItemAddon.Model");

const OrderItemAddonService = {
  // Create a new OrderItemAddon
  async createOrderItemAddon(data) {
    return await OrderItemAddon.create(data);
  },

  // Get all OrderItemAddons (optionally filter by order_item_id)
  async getAllOrderItemAddons(filter = {}) {
    return await OrderItemAddon.findAll({ where: filter, order: [["created_at", "DESC"]] });
  },

  // Get OrderItemAddon by ID with associations
  async getOrderItemAddonById(id, includeAssociations = true) {
    const include = includeAssociations
      ? [
          "OrderItem",
          "ItemAddon",
        ]
      : [];

    const orderItemAddon = await OrderItemAddon.findByPk(id, { include });
    if (!orderItemAddon) throw new Error("OrderItemAddon not found");
    return orderItemAddon;
  },

  // Update an OrderItemAddon by ID
  async updateOrderItemAddon(id, data) {
    const orderItemAddon = await OrderItemAddon.findByPk(id);
    if (!orderItemAddon) throw new Error("OrderItemAddon not found");
    await orderItemAddon.update(data);
    return orderItemAddon;
  },

  // Delete an OrderItemAddon by ID
  async deleteOrderItemAddon(id) {
    const orderItemAddon = await OrderItemAddon.findByPk(id);
    if (!orderItemAddon) throw new Error("OrderItemAddon not found");
    await orderItemAddon.destroy();
    return { message: "OrderItemAddon deleted successfully" };
  },

  // Get all OrderItemAddons by order_item_id
  async getOrderItemAddonsByOrderItemId(order_item_id) {
    return await OrderItemAddon.findAll({
      where: { order_item_id },
      order: [["created_at", "DESC"]],
    });
  },
};

module.exports = OrderItemAddonService;
