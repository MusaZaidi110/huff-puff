const OrderDealItem = require("../../Models/DealManagement/OrderDealItem.Model");

const OrderDealItemService = {
  // Create a new OrderDealItem
  async createOrderDealItem(data) {
    return await OrderDealItem.create(data);
  },

  // Get all OrderDealItems, optionally filtered by order_item_id or deal_item_id
  async getAllOrderDealItems(filters = {}) {
    const where = {};
    if (filters.order_item_id) where.order_item_id = filters.order_item_id;
    if (filters.deal_item_id) where.deal_item_id = filters.deal_item_id;

    return await OrderDealItem.findAll({ where });
  },

  // Get a single OrderDealItem by ID, with optional associations
  async getOrderDealItemById(id, includeAssociations = false) {
    const include = includeAssociations
      ? [
          "OrderItem",
          "DealItem",
          "Item",
          "ItemVariant",
          "ItemAddon",
        ]
      : [];
    return await OrderDealItem.findByPk(id, { include });
  },

  // Update an OrderDealItem by ID
  async updateOrderDealItem(id, data) {
    const orderDealItem = await OrderDealItem.findByPk(id);
    if (!orderDealItem) throw new Error("OrderDealItem not found");
    await orderDealItem.update(data);
    return orderDealItem;
  },

  // Delete an OrderDealItem by ID
  async deleteOrderDealItem(id) {
    const orderDealItem = await OrderDealItem.findByPk(id);
    if (!orderDealItem) throw new Error("OrderDealItem not found");
    await orderDealItem.destroy();
    return { message: "OrderDealItem deleted successfully" };
  },
};

module.exports = OrderDealItemService;
