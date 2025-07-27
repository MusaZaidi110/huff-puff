const LoyaltyPointsTransaction = require("../../Models/LoyaltySystem/LoyaltyPointsTransaction.Model");
const getLoyaltyPointsSummary = require("../LoyaltyPoints/GetLoyaltyPointSumary");
const { assignRewardToCustomer } = require("../CRUD/CustomerRewards/index");
// Record points earned from an order
async function recordOrderPoints(customerId, orderId, points) {
  try {
    const transaction = await LoyaltyPointsTransaction.create({
      customer_id: customerId,
      points: points,
      transaction_type: "earned",
      source_type: "order",
      source_id: orderId,
      description: `Earned ${points} points from order #${orderId}`,
    });

    return transaction;
  } catch (error) {
    console.error("Error recording order points:", error);
    throw error;
  }
}

// Redeem points for a reward
async function redeemPoints(customerId, rewardId, points) {
  try {
    // Check customer balance
    const summary = await getLoyaltyPointsSummary(customerId);
    if (summary.totalLoyaltyPoints < points) {
      throw new Error("Insufficient points balance");
    }

    // Create deduction transaction
    const transaction = await LoyaltyPointsTransaction.create({
      customer_id: customerId,
      points: -points,
      transaction_type: "redeemed",
      source_type: "order",
      source_id: rewardId,
      description: `Redeemed ${points} points for reward`,
    });

    // Assign reward to customer
    const customerReward = await assignRewardToCustomer(customerId, rewardId);

    return {
      transaction,
      customerReward,
    };
  } catch (error) {
    console.error("Error redeeming points:", error);
    throw error;
  }
}

module.exports = {
  recordOrderPoints,
  redeemPoints,
};
