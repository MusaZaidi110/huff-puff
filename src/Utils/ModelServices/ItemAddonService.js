const ItemAddon = require("../../Models/MenuManagement/ItemAddon.Model");
const Item = require("../../Models/MenuManagement/Item.Model");

const ItemAddonService = {
  // Create a new item addon
  async createItemAddon(data) {
    return await ItemAddon.create(data);
  },

  // Get all item addons (optionally filter by is_active)
  async getAllItemAddons({ activeOnly = false } = {}) {
    const where = activeOnly ? { is_active: true } : {};
    return await ItemAddon.findAll({
      where,
      include: [{ model: Item }],
      order: [["created_at", "DESC"]],
    });
  },

  // Get a single item addon by ID
  async getItemAddonById(id) {
    const addon = await ItemAddon.findByPk(id, {
      include: [{ model: Item }],
    });
    if (!addon) {
      throw new Error("ItemAddon not found");
    }
    return addon;
  },

  // Update an item addon by ID
  async updateItemAddon(id, data) {
    const addon = await ItemAddon.findByPk(id);
    if (!addon) {
      throw new Error("ItemAddon not found");
    }
    await addon.update(data);
    return addon;
  },

  // Deactivate (soft delete) item addon
  async deactivateItemAddon(id) {
    const addon = await ItemAddon.findByPk(id);
    if (!addon) {
      throw new Error("ItemAddon not found");
    }
    addon.is_active = false;
    await addon.save();
    return addon;
  },

  // Hard delete item addon
  async deleteItemAddon(id) {
    const addon = await ItemAddon.findByPk(id);
    if (!addon) {
      throw new Error("ItemAddon not found");
    }
    await addon.destroy();
    return { message: "ItemAddon deleted successfully" };
  },

  // Get all addons for a specific item
  async getAddonsByItemId(item_id) {
    return await ItemAddon.findAll({
      where: { item_id },
      include: [{ model: Item }],
    });
  },
};

module.exports = ItemAddonService;
