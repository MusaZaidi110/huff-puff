const LoyaltyReward = require("../../Models/LoyaltySystem/LoyaltyReward.Model");

const LoyaltyRewardService = {
  // Create a new loyalty reward
  async create(data) {
    return await LoyaltyReward.create(data);
  },

  // Get all loyalty rewards with optional filters
  async getAll(filter = {}) {
    const where = {};

    if (filter.is_active !== undefined) {
      where.is_active = filter.is_active;
    }

    if (filter.reward_type) {
      where.reward_type = filter.reward_type;
    }

    return await LoyaltyReward.findAll({
      where,
      order: [['created_at', 'DESC']],
    });
  },

  // Get a reward by its ID
  async getById(id) {
    return await LoyaltyReward.findByPk(id);
  },

  // Update a reward
  async update(id, data) {
    const reward = await LoyaltyReward.findByPk(id);
    if (!reward) throw new Error("LoyaltyReward not found");
    return await reward.update(data);
  },

  // Delete a reward
  async delete(id) {
    const reward = await LoyaltyReward.findByPk(id);
    if (!reward) throw new Error("LoyaltyReward not found");
    await reward.destroy();
    return { message: "LoyaltyReward deleted successfully" };
  },

  // Toggle activation status
  async toggleStatus(id, isActive) {
    const reward = await LoyaltyReward.findByPk(id);
    if (!reward) throw new Error("LoyaltyReward not found");
    reward.is_active = isActive;
    await reward.save();
    return reward;
  },

  // Get all purchasable rewards
  async getPurchasableRewards() {
    return await LoyaltyReward.findAll({
      where: {
        is_purchasable: true,
        is_active: true,
      },
      order: [['created_at', 'DESC']],
    });
  },

  // Get active rewards that are not expired
  async getValidRewards() {
    return await LoyaltyReward.findAll({
      where: {
        is_active: true,
        [Op.or]: [
          { expires_at: null },
          { expires_at: { [Op.gt]: new Date() } }
        ]
      },
    });
  },
};

module.exports = LoyaltyRewardService;
