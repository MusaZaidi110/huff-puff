const BranchDeal = require("../../Models/BranchManagement/BranchDeal.Model");


const BranchDealService = {
  // Create a new BranchDeal
  async createBranchDeal(data) {
    return await BranchDeal.create(data);
  },

  // Get all BranchDeals (optionally filter active only)
  async getAllBranchDeals({ activeOnly = false } = {}) {
    const where = activeOnly ? { is_active: true } : {};
    return await BranchDeal.findAll({ where });
  },

  // Get a single BranchDeal by ID
  async getBranchDealById(id) {
    return await BranchDeal.findByPk(id);
  },

  // Update a BranchDeal by ID
  async updateBranchDeal(id, data) {
    const branchDeal = await BranchDeal.findByPk(id);
    if (!branchDeal) {
      throw new Error("BranchDeal not found");
    }
    await branchDeal.update(data);
    return branchDeal;
  },

  // Delete a BranchDeal by ID (hard delete)
  async deleteBranchDeal(id) {
    const branchDeal = await BranchDeal.findByPk(id);
    if (!branchDeal) {
      throw new Error("BranchDeal not found");
    }
    await branchDeal.destroy();
    return { message: "BranchDeal deleted successfully" };
  },

  // Optional: Get all deals for a specific branch
  async getDealsByBranchId(branch_id) {
    return await BranchDeal.findAll({ where: { branch_id } });
  },

  // Optional: Get all branches where a specific deal is active
  async getBranchesByDealId(deal_id) {
    return await BranchDeal.findAll({ where: { deal_id } });
  }
};

module.exports = BranchDealService;
