const Promotion = require("../../Models/PromotionManagement/Promotion.Model");
const { Op } = require("sequelize");

const PromotionService = {
  // Create a new promotion
  async createPromotion(data) {
    return await Promotion.create(data);
  },

  // Get all promotions with optional filters (e.g. active only)
  async getAllPromotions(filter = {}) {
    return await Promotion.findAll({
      where: filter,
      order: [["startDate", "DESC"]],
      include: [{ association: "items" }]
    });
  },

  // Get promotion by ID
  async getPromotionById(id) {
    const promotion = await Promotion.findByPk(id, {
      include: [{ association: "items" }],
    });
    if (!promotion) throw new Error("Promotion not found");
    return promotion;
  },

  // Update a promotion by ID
  async updatePromotion(id, data) {
    const promotion = await Promotion.findByPk(id);
    if (!promotion) throw new Error("Promotion not found");
    await promotion.update(data);
    return promotion;
  },

  // Delete a promotion by ID
  async deletePromotion(id) {
    const promotion = await Promotion.findByPk(id);
    if (!promotion) throw new Error("Promotion not found");
    await promotion.destroy();
    return { message: "Promotion deleted successfully" };
  },

  // Get currently active promotions (valid date range and isActive)
  async getActivePromotions() {
    const now = new Date();
    return await Promotion.findAll({
      where: {
        isActive: true,
        startDate: { [Op.lte]: now },
        endDate: { [Op.gte]: now },
      },
      order: [["startDate", "DESC"]],
      include: [{ association: "items" }],
    });
  },

  // Add items to a promotion (expects array of item IDs)
  async addItemsToPromotion(promotionId, itemIds) {
    const promotion = await Promotion.findByPk(promotionId);
    if (!promotion) throw new Error("Promotion not found");
    await promotion.setItems(itemIds); // sets the association
    return await promotion.reload({ include: [{ association: "items" }] });
  },

  // Remove all items from a promotion
  async clearItemsFromPromotion(promotionId) {
    const promotion = await Promotion.findByPk(promotionId);
    if (!promotion) throw new Error("Promotion not found");
    await promotion.setItems([]);
    return promotion;
  },
};

module.exports = PromotionService;
