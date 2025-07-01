const CustomerReward = require("../../Models/LoyaltySystem/CustomerReward.Model");

const CustomerRewardService = {
  // Create a new CustomerReward
  async create(data) {
    return await CustomerReward.create(data);
  },

  // Get all CustomerRewards, with optional filters
  async getAll(filter = {}) {
    const where = {};
    if (filter.customer_id) where.customer_id = filter.customer_id;
    if (filter.reward_id) where.reward_id = filter.reward_id;
    if (filter.is_used !== undefined) where.is_used = filter.is_used;
    return await CustomerReward.findAll({ where });
  },

  // Get CustomerReward by ID
  async getById(id) {
    return await CustomerReward.findByPk(id);
  },

  // Update CustomerReward by ID
  async update(id, data) {
    const reward = await CustomerReward.findByPk(id);
    if (!reward) throw new Error("CustomerReward not found");
    await reward.update(data);
    return reward;
  },

  // Mark a CustomerReward as used
  async markAsUsed(id) {
    const reward = await CustomerReward.findByPk(id);
    if (!reward) throw new Error("CustomerReward not found");
    reward.is_used = true;
    reward.used_at = new Date();
    await reward.save();
    return reward;
  },

  // Delete CustomerReward by ID
  async delete(id) {
    const reward = await CustomerReward.findByPk(id);
    if (!reward) throw new Error("CustomerReward not found");
    await reward.destroy();
    return { message: "CustomerReward deleted successfully" };
  },
};

module.exports = CustomerRewardService;
