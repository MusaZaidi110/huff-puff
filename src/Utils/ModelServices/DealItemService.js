const DealItem = require("../../Models/DealManagement/DealItem.Model");

const DealItemService = {
  // Create a new deal item
  async createDealItem(data) {
    return await DealItem.create(data);
  },

  // Get all deal items, optionally filtered by deal_id or item_type
  async getAllDealItems(filters = {}) {
    const where = {};
    if (filters.deal_id) where.deal_id = filters.deal_id;
    if (filters.item_type) where.item_type = filters.item_type;

    return await DealItem.findAll({ where });
  },

  // Get a deal item by ID, optionally including associations
  async getDealItemById(id, includeAssociations = false) {
    const include = includeAssociations
      ? [
          "Deal",
          "Item",
          "ItemVariant",
          "ItemAddon",
        ]
      : [];
    return await DealItem.findByPk(id, { include });
  },

  // Update a deal item by ID
  async updateDealItem(id, data) {
    const dealItem = await DealItem.findByPk(id);
    if (!dealItem) throw new Error("DealItem not found");
    await dealItem.update(data);
    return dealItem;
  },

  // Delete a deal item by ID
  async deleteDealItem(id) {
    const dealItem = await DealItem.findByPk(id);
    if (!dealItem) throw new Error("DealItem not found");
    await dealItem.destroy();
    return { message: "DealItem deleted successfully" };
  },
};

module.exports = DealItemService;
