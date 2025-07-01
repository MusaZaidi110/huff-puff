const ItemVariant = require("../../Models/MenuManagement/ItemVariant.Model");
const Item = require("../../Models/MenuManagement/Item.Model");

const ItemVariantService = {
  // Create a new item variant
  async createItemVariant(data) {
    return await ItemVariant.create(data);
  },

  // Get all item variants (optionally filter active ones)
  async getAllItemVariants({ activeOnly = false } = {}) {
    const where = activeOnly ? { is_active: true } : {};
    return await ItemVariant.findAll({
      where,
      include: [{ model: Item }],
      order: [["created_at", "DESC"]],
    });
  },

  // Get a single item variant by ID
  async getItemVariantById(id) {
    const variant = await ItemVariant.findByPk(id, {
      include: [{ model: Item }],
    });
    if (!variant) {
      throw new Error("ItemVariant not found");
    }
    return variant;
  },

  // Update item variant by ID
  async updateItemVariant(id, data) {
    const variant = await ItemVariant.findByPk(id);
    if (!variant) {
      throw new Error("ItemVariant not found");
    }
    await variant.update(data);
    return variant;
  },

  // Deactivate (soft delete) an item variant
  async deactivateItemVariant(id) {
    const variant = await ItemVariant.findByPk(id);
    if (!variant) {
      throw new Error("ItemVariant not found");
    }
    variant.is_active = false;
    await variant.save();
    return variant;
  },

  // Hard delete item variant
  async deleteItemVariant(id) {
    const variant = await ItemVariant.findByPk(id);
    if (!variant) {
      throw new Error("ItemVariant not found");
    }
    await variant.destroy();
    return { message: "ItemVariant deleted successfully" };
  },

  // Get all variants for a specific item
  async getVariantsByItemId(item_id) {
    return await ItemVariant.findAll({
      where: { item_id },
      include: [{ model: Item }],
    });
  },
};

module.exports = ItemVariantService;
