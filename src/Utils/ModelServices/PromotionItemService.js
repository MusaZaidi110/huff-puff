const PromotionItem = require("../../Models/PromotionManagement/PromotionItem.Model");

const PromotionItemService = {
  // Add a single item to a promotion
  async addItemToPromotion(promotionId, itemId) {
    return await PromotionItem.create({ promotionId, itemId });
  },

  // Add multiple items to a promotion (bulk)
  async addItemsToPromotion(promotionId, itemIds) {
    const records = itemIds.map((itemId) => ({ promotionId, itemId }));
    return await PromotionItem.bulkCreate(records, { ignoreDuplicates: true });
  },

  // Remove an item from a promotion
  async removeItemFromPromotion(promotionId, itemId) {
    return await PromotionItem.destroy({
      where: { promotionId, itemId },
    });
  },

  // Remove all items from a promotion
  async removeAllItemsFromPromotion(promotionId) {
    return await PromotionItem.destroy({
      where: { promotionId },
    });
  },

  // Get all item IDs linked to a promotion
  async getItemsByPromotion(promotionId) {
    return await PromotionItem.findAll({
      where: { promotionId },
      attributes: ["itemId"],
    });
  },

  // Get all promotions linked to an item
  async getPromotionsByItem(itemId) {
    return await PromotionItem.findAll({
      where: { itemId },
      attributes: ["promotionId"],
    });
  },
};

module.exports = PromotionItemService;
