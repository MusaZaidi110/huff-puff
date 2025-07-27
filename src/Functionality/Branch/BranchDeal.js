const BranchDeal = require("../../Models/BranchManagement/BranchDeal.Model");

async function addDealToBranch(branchId, dealId, dealData = {}) {
  try {
    const branchDeal = await BranchDeal.create({
      branch_id: branchId,
      deal_id: dealId,
      ...dealData,
    });

    return branchDeal;
  } catch (error) {
    console.error("Error adding deal to branch:", error);
    throw error;
  }
}

async function getActiveBranchDeals(branchId, options = {}) {
  try {
    const { currentDate = new Date() } = options;

    const deals = await BranchDeal.findAll({
      where: {
        branch_id: branchId,
        is_active: true,
        [sequelize.Op.and]: [
          {
            [sequelize.Op.or]: [
              { start_date: null },
              { start_date: { [sequelize.Op.lte]: currentDate } },
            ],
          },
          {
            [sequelize.Op.or]: [
              { end_date: null },
              { end_date: { [sequelize.Op.gte]: currentDate } },
            ],
          },
        ],
      },
      include: [{ model: Deal, as: "deal" }],
      order: [["display_order", "ASC"]],
    });

    return deals;
  } catch (error) {
    console.error("Error getting active branch deals:", error);
    throw error;
  }
}

async function updateBranchDeal(branchDealId, updateData) {
  try {
    const branchDeal = await BranchDeal.findByPk(branchDealId);

    if (!branchDeal) {
      throw new Error("Branch deal not found");
    }

    await branchDeal.update(updateData);
    return branchDeal;
  } catch (error) {
    console.error("Error updating branch deal:", error);
    throw error;
  }
}

async function removeDealFromBranch(branchDealId) {
  try {
    const branchDeal = await BranchDeal.findByPk(branchDealId);

    if (!branchDeal) {
      throw new Error("Branch deal not found");
    }

    await branchDeal.destroy();
    return { message: "Deal removed from branch successfully" };
  } catch (error) {
    console.error("Error removing deal from branch:", error);
    throw error;
  }
}
module.exports = {
  addDealToBranch,
  getActiveBranchDeals,
  updateBranchDeal,
  removeDealFromBranch
};
