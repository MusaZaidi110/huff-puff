const BranchMenu = require("../../Models/BranchManagement/BranchMenu.Model");

const BranchMenuService = {
  // Create a new BranchMenu entry
  async createBranchMenu(data) {
    return await BranchMenu.create(data);
  },

  // Get all BranchMenu entries
  async getAllBranchMenus({ availableOnly = false } = {}) {
    const where = availableOnly ? { is_available: true } : {};
    return await BranchMenu.findAll({ where });
  },

  // Get a single BranchMenu by ID
  async getBranchMenuById(id) {
    return await BranchMenu.findByPk(id);
  },

  // Update a BranchMenu entry
  async updateBranchMenu(id, data) {
    const branchMenu = await BranchMenu.findByPk(id);
    if (!branchMenu) {
      throw new Error("BranchMenu not found");
    }
    await branchMenu.update(data);
    return branchMenu;
  },

  // Delete a BranchMenu entry
  async deleteBranchMenu(id) {
    const branchMenu = await BranchMenu.findByPk(id);
    if (!branchMenu) {
      throw new Error("BranchMenu not found");
    }
    await branchMenu.destroy();
    return { message: "BranchMenu deleted successfully" };
  },

  // Optional: Get all menu items for a specific branch
  async getMenusByBranchId(branch_id) {
    return await BranchMenu.findAll({ where: { branch_id } });
  },

  // Optional: Get all branch entries for a specific item
  async getBranchesByItemId(item_id) {
    return await BranchMenu.findAll({ where: { item_id } });
  },
};

module.exports = BranchMenuService;
