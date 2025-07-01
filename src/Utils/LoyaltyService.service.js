class LoyaltyService {
  constructor(models, sequelize) {
    this.models = models;
    this.sequelize = sequelize;
  }

  // Admin sets point conversion rate
  async setPointConversionRate(pointsPerDihram) {
    const reward = await this.models.LoyaltyReward.findOne();
    if (!reward) throw new Error("LoyaltyReward configuration not found");

    reward.point_to_dhram_ratio = pointsPerDihram;
    await reward.save();
    return reward;
  }

  // Customer purchases points
  async purchasePoints(customerId, dihramAmount, paymentMethod) {
    if (isNaN(dihramAmount) || dihramAmount <= 0) {
      throw new Error("Invalid amount to purchase points");
    }

    const reward = await this.models.LoyaltyReward.findOne();
    if (!reward) throw new Error("LoyaltyReward configuration not found");

    const points = dihramAmount * reward.point_to_dhram_ratio;

    const purchase = await this.models.LoyaltyPointPurchase.create({
      customer_id: customerId,
      points_purchased: points,
      amount_paid: dihramAmount,
      payment_method: paymentMethod
    });

    await this.addPoints(customerId, points, 'purchased', purchase.id);

    return purchase;
  }

  // Gift points to another user
  async giftPoints(senderId, receiverId, points, message) {
    if (senderId === receiverId) {
      throw new Error("You cannot gift points to yourself");
    }

    const sender = await this.models.Customer.findByPk(senderId);
    if (!sender) throw new Error("Sender not found");

    if (sender.loyalty_points < points) {
      throw new Error("Insufficient loyalty points");
    }

    const transfer = await this.models.LoyaltyPointTransfer.create({
      sender_id: senderId,
      receiver_id: receiverId,
      points_transferred: points,
      message: message
    });

    // Points deducted only after gift is accepted
    return transfer;
  }

  // Accept/reject gift
  async processGift(transferId, accept = true) {
    const transfer = await this.models.LoyaltyPointTransfer.findByPk(transferId);
    if (!transfer) throw new Error("Gift transfer not found");

    if (transfer.is_accepted !== null) {
      throw new Error("Gift has already been processed");
    }

    if (accept) {
      await this.sequelize.transaction(async (t) => {
        await this.removePoints(transfer.sender_id, transfer.points_transferred, 'gifted', transfer.id);
        await this.addPoints(transfer.receiver_id, transfer.points_transferred, 'received', transfer.id);

        transfer.is_accepted = true;
        await transfer.save({ transaction: t });
      });
    } else {
      transfer.is_accepted = false;
      await transfer.save();
    }

    return transfer;
  }

  // Add points helper
  async addPoints(customerId, points, sourceType, sourceId) {
    const customer = await this.models.Customer.findByPk(customerId);
    if (!customer) throw new Error("Customer not found");

    await this.sequelize.transaction(async (t) => {
      customer.loyalty_points += points;

      if (sourceType === 'purchased') customer.loyalty_points_purchased += points;
      if (sourceType === 'received') customer.loyalty_points_received += points;

      await customer.save({ transaction: t });

      await this.models.LoyaltyPointsTransaction.create({
        customer_id: customerId,
        points: points,
        transaction_type: sourceType,
        source_id: sourceId
      }, { transaction: t });
    });
  }

  // Remove points helper
  async removePoints(customerId, points, sourceType, sourceId) {
    const customer = await this.models.Customer.findByPk(customerId);
    if (!customer) throw new Error("Customer not found");

    if (customer.loyalty_points < points) {
      throw new Error("Insufficient loyalty points");
    }

    await this.sequelize.transaction(async (t) => {
      customer.loyalty_points -= points;

      if (sourceType === 'gifted') customer.loyalty_points_gifted += points;
      if (sourceType === 'redeemed') customer.loyalty_points_redeemed += points;

      await customer.save({ transaction: t });

      await this.models.LoyaltyPointsTransaction.create({
        customer_id: customerId,
        points: -points,
        transaction_type: sourceType,
        source_id: sourceId
      }, { transaction: t });
    });
  }

  // Apply loyalty discount to order
  async applyLoyaltyDiscount(orderId, pointsToRedeem) {
    const order = await this.models.Order.findByPk(orderId);
    if (!order) throw new Error("Order not found");

    const customer = await order.getCustomer();
    if (!customer) throw new Error("Customer not found");

    const reward = await this.models.LoyaltyReward.findOne();
    if (!reward) throw new Error("LoyaltyReward configuration not found");

    const redemptionRules = typeof reward.redemption_rules === 'string'
      ? JSON.parse(reward.redemption_rules)
      : reward.redemption_rules;

    const redemption = Object.entries(redemptionRules)
      .sort((a, b) => parseInt(b[0]) - parseInt(a[0]))
      .find(([threshold]) => pointsToRedeem >= parseInt(threshold));

    if (!redemption) {
      throw new Error("No applicable redemption rule for these points");
    }

    const [threshold, rule] = redemption;
    const pointsUsed = parseInt(threshold);
    let discountAmount = 0;

    if (rule.discount_type === 'percentage') {
      discountAmount = order.subtotal * (rule.value / 100);
    } else {
      discountAmount = rule.value;
    }

    const alreadyRewarded = await this.models.CustomerReward.findOne({
      where: {
        customer_id: customer.id,
        reward_id: reward.id,
        order_id: order.id
      }
    });

    if (alreadyRewarded) {
      throw new Error("Loyalty reward already applied to this order");
    }

    await this.sequelize.transaction(async (t) => {
      await this.removePoints(customer.id, pointsUsed, 'redeemed', order.id);

      order.discount_amount = discountAmount;
      order.total_amount = order.subtotal - discountAmount + order.tax + order.delivery_fee;
      await order.save({ transaction: t });

      await this.models.CustomerReward.create({
        customer_id: customer.id,
        reward_id: reward.id,
        order_id: order.id,
        points_used: pointsUsed,
        discount_amount: discountAmount
      }, { transaction: t });
    });

    return { discountAmount, pointsUsed };
  }
}



// To Implement this Service
// const models = require('../models'); // this is your index.js
// const LoyaltyService = require('../services/LoyaltyService');

// const loyaltyService = new LoyaltyService(models, models.sequelize);