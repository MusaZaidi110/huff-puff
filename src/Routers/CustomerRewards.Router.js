const express = require("express");
const router = express.Router();
const Joi = require("joi");

const {validateRequest} = require("../Middlewares/ValidateRequest");
const assignRewardToCustomer =
  require("../Functionality/LoyaltyPoints/CustomerRewards").assignRewardToCustomer;
const getCustomerRewards =
  require("../Functionality/LoyaltyPoints/CustomerRewards").getCustomerRewards;
const getLoyaltyPointsSummary = require("../Functionality/LoyaltyPoints/GetLoyaltyPointSumary");
const purchaseLoyaltyPoints =
  require("../Functionality/LoyaltyPoints/LoyaltyPointsPurchase/index").purchaseLoyaltyPoints;
const redeemPoints =
  require("../Functionality/LoyaltyPoints/PointsTransactionHandling").redeemPoints;

// Validation Schemas
const assignRewardSchema = Joi.object({
  rewardId: Joi.number().integer().positive().required()
});
const purchasePointsSchema = Joi.object({
  points: Joi.number().integer().positive().required(),
  amount: Joi.number().positive().required(),
  paymentMethod: Joi.string().valid("credit_card", "paypal", "bank_transfer").required()
});
const redeemPointsSchema = Joi.object({
  rewardId: Joi.number().integer().positive().required(),
  points: Joi.number().integer().positive().required()
});
const transferPointsSchema = Joi.object({
  receiverId: Joi.string().uuid().required(), // or use Joi.number().integer() if your IDs are numeric
  points: Joi.number().integer().positive().required(),
  message: Joi.string().max(255).optional().allow('')
});

const getPendingTransfersParamsSchema = Joi.object({
  receiverId: Joi.string().uuid().required()
});



// Assign a reward to customer (typically called after redemption)
router.post("/:customerId/rewards", validateRequest(assignRewardSchema) ,async (req, res) => {
  try {
    if (
      req.user.id !== req.params.customerId &&
      !req.user.roles.includes("admin")
    ) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    const customerReward = await assignRewardToCustomer(
      req.params.customerId,
      req.body.rewardId
    );
    res.status(201).json(customerReward);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get customer's available rewards
router.get("/:customerId/rewards", validateRequest(assignRewardSchema), async (req, res) => {
  try {
    if (
      req.user.id !== req.params.customerId &&
      !req.user.roles.includes("admin")
    ) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    const rewards = await getCustomerRewards(req.params.customerId);
    res.json(rewards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get("/:customerId/points", validateRequest(assignRewardSchema), async (req, res) => {
  try {
    if (
      req.user.id !== req.params.customerId &&
      !req.user.roles.includes("admin")
    ) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    const summary = await getLoyaltyPointsSummary(req.params.customerId);
    res.json(summary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Purchase loyalty points
router.post("/:customerId/points/purchase", validateRequest(purchasePointsSchema) ,async (req, res) => {
  try {
    if (req.user.id !== req.params.customerId) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    const purchase = await purchaseLoyaltyPoints(
      req.params.customerId,
      req.body.points,
      req.body.amount,
      req.body.paymentMethod
    );
    res.status(201).json(purchase);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Redeem points for reward
router.post("/:customerId/points/redeem", validateRequest(redeemPointsSchema) ,async (req, res) => {
  try {
    if (req.user.id !== req.params.customerId) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    const result = await redeemPoints(
      req.params.customerId,
      req.body.rewardId,
      req.body.points
    );
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Transfer points to another customer
router.post("/:senderId/points/transfer", validateRequest(transferPointsSchema) ,async (req, res) => {
  try {
    if (req.user.id !== req.params.senderId) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    const transfer = await transferLoyaltyPoints(
      req.params.senderId,
      req.body.receiverId,
      req.body.points,
      req.body.message
    );
    res.status(201).json(transfer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get pending transfers for receiver
router.get("/:receiverId/points/transfers/pending", validateRequest(getPendingTransfersParamsSchema) ,async (req, res) => {
  try {
    if (
      req.user.id !== req.params.receiverId
    ) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    const transfers = await LoyaltyPointTransfer.findAll({
      where: {
        receiver_id: req.params.receiverId,
        is_accepted: false,
      },
      include: [{ model: Customer, as: "Sender" }],
    });
    res.json(transfers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
