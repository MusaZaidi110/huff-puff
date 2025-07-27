const LoyaltyPointTransfer = require('../../../Models/LoyaltySystem/LoyaltyPointTransfer.Model');
const LoyaltyPointsTransaction = require('../../../Models/LoyaltySystem/LoyaltyPointsTransaction.Model');
const getLoyaltyPointsSummary = require('../GetLoyaltyPointSumary');


// Transfer points to another customer
async function transferLoyaltyPoints(senderId, receiverId, points, message) {
  try {
    // Check sender's balance
    const summary = await getLoyaltyPointsSummary(senderId);
    if (summary.totalLoyaltyPoints < points) {
      throw new Error("Insufficient points balance");
    }

    const transfer = await LoyaltyPointTransfer.create({
      sender_id: senderId,
      receiver_id: receiverId,
      points_transferred: points,
      message: message,
      is_accepted: false
    });

    return transfer;
  } catch (error) {
    console.error("Error transferring loyalty points:", error);
    throw error;
  }
}

// Accept points transfer
async function acceptPointsTransfer(transferId, receiverId) {
  try {
    const transfer = await LoyaltyPointTransfer.findByPk(transferId);
    if (!transfer) {
      throw new Error("Transfer not found");
    }
    if (transfer.receiver_id !== receiverId) {
      throw new Error("Not authorized to accept this transfer");
    }
    if (transfer.is_accepted) {
      throw new Error("Transfer already accepted");
    }

    // Update transfer status
    await transfer.update({ is_accepted: true });

    // Create transaction for sender (deduction)
    await LoyaltyPointsTransaction.create({
      customer_id: transfer.sender_id,
      points: -transfer.points_transferred,
      transaction_type: 'redeemed',
      source_type: 'transfer',
      source_id: transfer.id,
      description: `Transferred ${transfer.points_transferred} points to another customer`
    });

    // Create transaction for receiver (addition)
    await LoyaltyPointsTransaction.create({
      customer_id: transfer.receiver_id,
      points: transfer.points_transferred,
      transaction_type: 'earned',
      source_type: 'transfer',
      source_id: transfer.id,
      description: `Received ${transfer.points_transferred} points from another customer`
    });

    return transfer;
  } catch (error) {
    console.error("Error accepting points transfer:", error);
    throw error;
  }
}

module.exports = {
    transferLoyaltyPoints,
    acceptPointsTransfer
}