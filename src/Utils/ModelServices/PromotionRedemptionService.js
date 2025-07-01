const PromotionRedemption = require("../../Models/PromotionManagement/PromotionRedemption.Model");

const PromotionRedemptionService = {
  // Create a new promotion redemption record
  async create(data) {
    return await PromotionRedemption.create(data);
  },

  // Find a redemption by ID
  async findById(id) {
    return await PromotionRedemption.findByPk(id);
  },

  // Find all redemptions for a specific promotion
  async findByPromotionId(promotionId) {
    return await PromotionRedemption.findAll({
      where: { promotionId },
    });
  },

  // Find all redemptions for a specific order
  async findByOrderId(orderId) {
    return await PromotionRedemption.findAll({
      where: { orderId },
    });
  },

  // Update a redemption record by ID
  async update(id, data) {
    const redemption = await PromotionRedemption.findByPk(id);
    if (!redemption) throw new Error("PromotionRedemption not found");
    return await redemption.update(data);
  },

  // Delete a redemption record by ID
  async delete(id) {
    return await PromotionRedemption.destroy({ where: { id } });
  },
};

module.exports = PromotionRedemptionService;
