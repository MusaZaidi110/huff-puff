const LoyaltyPointPurchase = require('../../../Models/LoyaltySystem/LoyaltyPointPurchase.Model');
const LoyaltyPointsTransaction = require('../../../Models/LoyaltySystem/LoyaltyPointsTransaction.Model');    

// Purchase loyalty points
async function purchaseLoyaltyPoints(customerId, points, amount, paymentMethod) {
  try {
    const purchase = await LoyaltyPointPurchase.create({
      customer_id: customerId,
      points_purchased: points,
      amount_paid: amount,
      payment_method: paymentMethod,
      payment_status: 'pending'
    });

    // Here you would typically process the payment
    // After payment is successful:
    // await purchase.update({ payment_status: 'completed' });
    // await createPointsTransaction(...);

    return purchase;
  } catch (error) {
    console.error("Error purchasing loyalty points:", error);
    throw error;
  }
}

// Complete points purchase after payment
async function completePointsPurchase(purchaseId, transactionId) {
  try {
    const purchase = await LoyaltyPointPurchase.findByPk(purchaseId);
    if (!purchase) {
      throw new Error("Purchase not found");
    }

    await purchase.update({
      payment_status: 'completed',
      transaction_id: transactionId
    });

    // Create points transaction
    await LoyaltyPointsTransaction.create({
      customer_id: purchase.customer_id,
      points: purchase.points_purchased,
      transaction_type: 'earned',
      source_type: 'purchase',
      source_id: purchase.id,
      description: `Purchased ${purchase.points_purchased} points`
    });

    return purchase;
  } catch (error) {
    console.error("Error completing points purchase:", error);
    throw error;
  }
}


module.exports = {
    purchaseLoyaltyPoints,
    completePointsPurchase
}