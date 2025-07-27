const LoyaltyReward = require('../../../Models/LoyaltySystem/LoyaltyReward.Model');
const CustomerReward = require('../../../Models/LoyaltySystem/CustomerReward.Model');
const Op = require('sequelize');

// Assign a reward to a customer
async function assignRewardToCustomer(customerId, rewardId) {
  try {
    const reward = await LoyaltyReward.findByPk(rewardId);
    if (!reward || !reward.is_active) {
      throw new Error("Reward not available");
    }

    const customerReward = await CustomerReward.create({
      customer_id: customerId,
      reward_id: rewardId,
      expires_at: reward.expires_at,
    });

    return customerReward;
  } catch (error) {
    console.error("Error assigning reward to customer:", error);
    throw error;
  }
}

// Get customer's available rewards
async function getCustomerRewards(customerId) {
  try {
    const rewards = await CustomerReward.findAll({
      where: {
        customer_id: customerId,
        is_used: false,
        expires_at: { [Op.gte]: new Date() },
      },
      include: [{ model: LoyaltyReward }],
    });
    return rewards;
  } catch (error) {
    console.error("Error getting customer rewards:", error);
    throw error;
  }
}

// Mark reward as used
async function useCustomerReward(customerRewardId) {
  try {
    const customerReward = await CustomerReward.findByPk(customerRewardId);
    if (!customerReward) {
      throw new Error("Customer reward not found");
    }
    if (customerReward.is_used) {
      throw new Error("Reward already used");
    }
    if (customerReward.expires_at < new Date()) {
      throw new Error("Reward has expired");
    }

    await customerReward.update({
      is_used: true,
      used_at: new Date(),
    });

    return customerReward;
  } catch (error) {
    console.error("Error using customer reward:", error);
    throw error;
  }
}

module.exports = {
  assignRewardToCustomer,
  getCustomerRewards,
  useCustomerReward,
};
