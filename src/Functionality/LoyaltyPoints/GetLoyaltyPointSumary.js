const LoyaltyPointTransfer = require("../../Models/LoyaltySystem/LoyaltyPointTransfer.Model");
const Customer = require("../../Models/UserManagement/Customer.Model");
const LoyaltyPointPurchase = require("../../Models/LoyaltySystem/LoyaltyPointPurchase.Model");
const LoyaltyPointsTransaction = require("../../Models/LoyaltySystem/LoyaltyPointsTransaction.Model");

async function getLoyaltyPointsSummary(customerId) {
  try {
    // Get total earned points (excluding purchased points)
    const totalEarned = await LoyaltyPointsTransaction.sum("points", {
      where: {
        customer_id: customerId,
        transaction_type: ["earned", "referral", "adjusted"],
      },
    });

    // Get total purchased points
    const totalPurchased = await LoyaltyPointPurchase.sum("points_purchased", {
      where: {
        customer_id: customerId,
        payment_status: "completed",
      },
    });

    // Get total consumed points
    const totalConsumed = await LoyaltyPointsTransaction.sum("points", {
      where: {
        customer_id: customerId,
        transaction_type: "redeemed",
      },
    });

    // Get total transferred points (both sent and received)
    const totalSent = await LoyaltyPointTransfer.sum("points_transferred", {
      where: {
        sender_id: customerId,
        is_accepted: true,
      },
    });

    const totalReceived = await LoyaltyPointTransfer.sum("points_transferred", {
      where: {
        receiver_id: customerId,
        is_accepted: true,
      },
    });

    // Get current balance
    const currentBalance =
      (totalEarned || 0) +
      (totalPurchased || 0) -
      (totalConsumed || 0) -
      (totalSent || 0) +
      (totalReceived || 0);

    // Get transaction history
    const transactions = await LoyaltyPointsTransaction.findAll({
      where: { customer_id: customerId },
      order: [["created_at", "DESC"]],
      limit: 50,
    });

    return {
      totalLoyaltyPoints: currentBalance,
      totalEarnedPoints: totalEarned || 0,
      totalPurchasedPoints: totalPurchased || 0,
      totalConsumedPoints: totalConsumed || 0,
      totalSentPoints: totalSent || 0,
      totalReceivedPoints: totalReceived || 0,
      transactions: transactions.map((t) => t.toJSON()),
    };
  } catch (error) {
    console.error("Error getting loyalty points summary:", error);
    throw error;
  }
}

module.exports = getLoyaltyPointsSummary;