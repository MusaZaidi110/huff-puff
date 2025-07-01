const Deal = require("../../Models/DealManagement/Deal.Model");

const DealService = {
  // Create a new deal
  async createDeal(data) {
    return await Deal.create(data);
  },

  // Get all deals, optionally filter by active status
  async getAllDeals({ isActive } = {}) {
    const where = {};
    if (typeof isActive === "boolean") {
      where.is_active = isActive;
    }
    return await Deal.findAll({ where });
  },

  // Get a deal by ID, optionally including associated models
  async getDealById(id, includeAssociations = false) {
    const include = includeAssociations
      ? [
          "Category", 
          "DealItems", 
          { model: require("../models/Branch"), through: "branch_deals" }
        ]
      : [];
    return await Deal.findByPk(id, { include });
  },

  // Update a deal by ID
  async updateDeal(id, data) {
    const deal = await Deal.findByPk(id);
    if (!deal) throw new Error("Deal not found");
    await deal.update(data);
    return deal;
  },

  // Delete a deal by ID
  async deleteDeal(id) {
    const deal = await Deal.findByPk(id);
    if (!deal) throw new Error("Deal not found");
    await deal.destroy();
    return { message: "Deal deleted successfully" };
  },

  // Optional: Get active deals that are valid today
  async getActiveValidDeals() {
    const today = new Date();
    return await Deal.findAll({
      where: {
        is_active: true,
        valid_from: { [Deal.sequelize.Op.lte]: today },
        valid_to: { [Deal.sequelize.Op.gte]: today },
      },
    });
  },
};

module.exports = DealService;
