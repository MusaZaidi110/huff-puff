const Item = require("../../Models/MenuManagement/Item.Model");
const Category = require("../../Models/MenuManagement/Category.Model");
const ItemVariant = require("../../Models/MenuManagement/ItemVariant.Model");
const ItemAddon = require("../../Models/MenuManagement/ItemAddon.Model");
const Branch = require("../../Models/BranchManagement/Branch.Model");
const Promotion = require("../../Models/PromotionManagement/Promotion.Model");

const ItemService = {
  // Create a new item
  async createItem(data) {
    return await Item.create(data);
  },

  // Get all items, optionally filtering by is_active
  async getAllItems({ activeOnly = false } = {}) {
    const where = activeOnly ? { is_active: true } : {};
    return await Item.findAll({
      where,
      include: [
        { model: Category },
        { model: ItemVariant },
        { model: ItemAddon },
        { model: Branch },
        { model: Promotion, as: "promotions" },
      ],
      order: [["created_at", "DESC"]],
    });
  },

  // Get a single item by ID
  async getItemById(id) {
    const item = await Item.findByPk(id, {
      include: [
        { model: Category },
        { model: ItemVariant },
        { model: ItemAddon },
        { model: Branch },
        { model: Promotion, as: "promotions" },
      ],
    });
    if (!item) {
      throw new Error("Item not found");
    }
    return item;
  },

  // Update an item by ID
  async updateItem(id, data) {
    const item = await Item.findByPk(id);
    if (!item) {
      throw new Error("Item not found");
    }
    await item.update(data);
    return item;
  },

  // Soft delete: deactivate item
  async deactivateItem(id) {
    const item = await Item.findByPk(id);
    if (!item) {
      throw new Error("Item not found");
    }
    item.is_active = false;
    await item.save();
    return item;
  },

  // Hard delete: permanently remove item
  async deleteItem(id) {
    const item = await Item.findByPk(id);
    if (!item) {
      throw new Error("Item not found");
    }
    await item.destroy();
    return { message: "Item deleted successfully" };
  },

  // Get all items for a specific category
  async getItemsByCategoryId(category_id) {
    return await Item.findAll({
      where: { category_id },
      include: [{ model: Category }],
    });
  },

  // Get all items for a specific branch (through branch_menu)
  async getItemsByBranchId(branch_id) {
    return await Item.findAll({
      include: [
        {
          model: Branch,
          where: { id: branch_id },
          through: { attributes: [] },
        },
      ],
    });
  },

  // Get all items associated with a specific promotion
  async getItemsByPromotionId(promotionId) {
    return await Item.findAll({
      include: [
        {
          model: Promotion,
          as: "promotions",
          where: { id: promotionId },
          through: { attributes: [] },
        },
      ],
    });
  },
};

module.exports = ItemService;
