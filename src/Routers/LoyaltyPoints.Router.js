const express = require("express");
const router = express.Router();
const Joi = require("joi");

const completePointsPurchase =
  require("../Functionality/CRUD/LoyaltyPointsPurchase/index").completePointsPurchase;
const useCustomerReward =
  require("../Functionality/CRUD/CustomerRewards").useCustomerReward;
const acceptPointsTransfer =
  require("../Functionality/CRUD/LoyaltyPointsTransfer").acceptPointsTransfer;
const convertPointsToCurrency =
  require("../Functionality/LoyaltyPoints/HelperFunctions").convertPointsToCurrency;
const convertCurrencyToPoints =
  require("../Functionality/LoyaltyPoints/HelperFunctions").convertCurrencyToPoints;
const getPointsToCurrencyRatio =
  require("../Functionality/LoyaltyPoints/HelperFunctions").getPointsToCurrencyRatio;
const LoyaltyPointTransfer = require("../Models/LoyaltySystem/LoyaltyPointTransfer.Model");
const { validateRequest } = require("../Middlewares/ValidateRequest");

// Joi Params and Body Validation
const completePointsPurchaseSchema = Joi.object({
  id: Joi.string().uuid().required(),
  transactionId: Joi.string().required(),
});
const idParamsSchema = Joi.object({
  id: Joi.string().uuid().required()
});
const convertToCurrencyQuerySchema = Joi.object({
  points: Joi.number().integer().positive().required()
});
const convertToPointsQuerySchema = Joi.object({
  amount: Joi.number().positive().required()
});




// Complete points purchase (webhook typically)
router.post("/point-purchases/:id/complete", validateRequest(completePointsPurchaseSchema) ,async (req, res) => {
  try {
    const purchase = await completePointsPurchase(
      req.params.id,
      req.body.transactionId
    );
    res.json(purchase);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Mark reward as used
router.patch("/customer-rewards/:id/use", validateRequest(idParamsSchema) ,async (req, res) => {
  try {
    const customerReward = await useCustomerReward(req.params.id);

    // Verify the requesting user owns this reward
    if (
      req.user.id !== customerReward.customer_id &&
      !req.user.roles.includes("admin")
    ) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    res.json(customerReward);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Accept points transfer
router.patch("/point-transfers/:id/accept", validateRequest(idParamsSchema) ,async (req, res) => {
  try {
    const transfer = await acceptPointsTransfer(
      req.params.id,
      req.user.id // receiver must be the authenticated user
    );
    res.json(transfer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Decline points transfer
router.patch("/point-transfers/:id/decline", validateRequest(idParamsSchema) ,async (req, res) => {
  try {
    const transfer = await LoyaltyPointTransfer.findByPk(req.params.id);
    if (!transfer) {
      return res.status(404).json({ error: "Transfer not found" });
    }
    if (transfer.receiver_id !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    await transfer.destroy();
    res.json({ message: "Transfer declined and deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get points conversion rate
router.get("/conversion-rate", async (req, res) => {
  try {
    const ratio = await getPointsToCurrencyRatio();
    res.json({ ratio });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Convert points to currency value
router.get("/convert-to-currency", validateRequest(convertToCurrencyQuerySchema) ,async (req, res) => {
  try {
    if (!req.query.points) {
      return res.status(400).json({ error: "Points parameter required" });
    }
    const value = await convertPointsToCurrency(parseInt(req.query.points));
    res.json({ currencyValue: value });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Convert currency to points
router.get("/convert-to-points", validateRequest(convertToPointsQuerySchema) ,async (req, res) => {
  try {
    if (!req.query.amount) {
      return res.status(400).json({ error: "Amount parameter required" });
    }
    const points = await convertCurrencyToPoints(parseFloat(req.query.amount));
    res.json({ points });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
