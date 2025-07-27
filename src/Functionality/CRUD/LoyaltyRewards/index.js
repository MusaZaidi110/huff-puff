// Create a new loyalty reward
async function createLoyaltyReward(rewardData) {
  try {
    const reward = await LoyaltyReward.create(rewardData);
    return reward;
  } catch (error) {
    console.error("Error creating loyalty reward:", error);
    throw error;
  }
}

// Get all active loyalty rewards
async function getActiveLoyaltyRewards() {
  try {
    const rewards = await LoyaltyReward.findAll({
      where: { is_active: true },
      include: [{ model: Item, as: "FreeItem" }],
    });
    return rewards;
  } catch (error) {
    console.error("Error getting active loyalty rewards:", error);
    throw error;
  }
}

// Update a loyalty reward
async function updateLoyaltyReward(rewardId, updateData) {
  try {
    const reward = await LoyaltyReward.findByPk(rewardId);
    if (!reward) {
      throw new Error("Reward not found");
    }
    await reward.update(updateData);
    return reward;
  } catch (error) {
    console.error("Error updating loyalty reward:", error);
    throw error;
  }
}

// Delete a loyalty reward
async function deleteLoyaltyReward(rewardId) {
  try {
    const reward = await LoyaltyReward.findByPk(rewardId);
    if (!reward) {
      throw new Error("Reward not found");
    }
    await reward.destroy();
    return { message: "Reward deleted successfully" };
  } catch (error) {
    console.error("Error deleting loyalty reward:", error);
    throw error;
  }
}

module.exports = {
  createLoyaltyReward,
  getActiveLoyaltyRewards,
  updateLoyaltyReward,
  deleteLoyaltyReward,
};
