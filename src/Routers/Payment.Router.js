const express = require("express");
const router = express.Router();
const {
  createPayment,
  getPaymentById,
  getPayments,
  completePayment,
  failPayment,
  processRefund,
} = require("../Functionality/Payment/PaymentManagement");

// Validations
const Joi = require("joi");
const { validateRequest } = require("../Middlewares/ValidateRequest");

// POST /payments
const createPaymentSchema = Joi.object({
  amount: Joi.number().positive().required(),
  currency: Joi.string().length(3).uppercase().required(),
  payment_method: Joi.string()
    .valid("credit_card", "paypal", "bank_transfer", "cash", "stripe")
    .required(),
  status: Joi.string()
    .valid("pending", "completed", "failed", "refunded")
    .required(),
  transaction_id: Joi.string().optional(),
  order_id: Joi.number().integer().optional(),
});
// GET /payments (with query filters)
const getPaymentsSchema = Joi.object({
  orderId: Joi.number().integer().optional(),
  status: Joi.string()
    .valid("pending", "completed", "failed", "refunded")
    .optional(),
  method: Joi.string()
    .valid("credit_card", "paypal", "bank_transfer", "cash", "stripe")
    .optional(),
  fromDate: Joi.date().iso().optional(),
  toDate: Joi.date().iso().optional(),
  limit: Joi.number().integer().min(1).optional(),
  offset: Joi.number().integer().min(0).optional(),
});
// PUT /payments/:id/complete
const completePaymentSchema = Joi.object({
  transactionId: Joi.string().required(),
});
// POST /payments/:id/refunds
const refundSchema = Joi.object({
  amount: Joi.number().positive().required(),
  reason: Joi.string().max(255).optional(),
});

// Create payment record
router.post("/", validateRequest(createPaymentSchema) ,async (req, res) => {
  try {
    const payment = await createPayment(req.body);
    res.status(201).json(payment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get payment by ID
router.get("/:id", async (req, res) => {
  try {
    const payment = await getPaymentById(req.params.id);
    res.json(payment);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Get payments with filters
router.get("/", validateRequest(getPaymentsSchema) ,async (req, res) => {
  try {
    const payments = await getPayments({
      orderId: req.query.orderId,
      status: req.query.status,
      paymentMethod: req.query.method,
      fromDate: req.query.fromDate,
      toDate: req.query.toDate,
      limit: parseInt(req.query.limit) || 100,
      offset: parseInt(req.query.offset) || 0,
    });
    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Complete payment (webhook typically)
router.put("/:id/complete", validateRequest(completePaymentSchema) ,async (req, res) => {
  try {
    const payment = await completePayment(
      req.params.id,
      req.body.transactionId
    );
    res.json(payment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Fail payment (webhook typically)
router.put("/:id/fail", async (req, res) => {
  try {
    const payment = await failPayment(req.params.id);
    res.json(payment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Process refund
router.post("/:id/refunds", validateRequest(refundSchema) ,async (req, res) => {
  try {
    const refund = await processRefund(req.params.id, req.body);
    res.status(201).json(refund);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
