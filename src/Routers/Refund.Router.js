const express = require("express");
const router = express.Router();
const {
  getRefundById,
  getRefunds,
  completeRefund,
  failRefund,
} = require("../Functionality/Payment/RefundManagement");

// Validations
const Joi = require("joi");
const { validateRequest } = require("../Middlewares/ValidateRequest");

const getRefundByIdSchema = Joi.object({
  id: Joi.string().uuid().required().label("Refund ID"),
});
const getRefundsQuerySchema = Joi.object({
  paymentId: Joi.string().uuid().optional().label("Payment ID"),
  status: Joi.string()
    .valid("pending", "completed", "failed")
    .optional()
    .label("Status"),
  fromDate: Joi.date().iso().optional().label("From Date"),
  toDate: Joi.date().iso().optional().label("To Date"),
  limit: Joi.number().integer().min(1).max(1000).optional().label("Limit"),
  offset: Joi.number().integer().min(0).optional().label("Offset"),
});
const completeRefundSchema = Joi.object({
  id: Joi.string().uuid().required().label("Refund ID (Param)"),
  body: Joi.object({
    refundId: Joi.string().required().label("Refund ID from Gateway"),
  }),
});
const failRefundSchema = Joi.object({
  id: Joi.string().uuid().required().label("Refund ID"),
});


// Get refund by ID
router.get("/:id", validateRequest(getRefundByIdSchema), async (req, res) => {
  try {
    const refund = await getRefundById(req.params.id);
    res.json(refund);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Get refunds with filters
router.get("/", validateRequest(getRefundsQuerySchema) ,async (req, res) => {
  try {
    const refunds = await getRefunds({
      paymentId: req.query.paymentId,
      status: req.query.status,
      fromDate: req.query.fromDate,
      toDate: req.query.toDate,
      limit: parseInt(req.query.limit) || 100,
      offset: parseInt(req.query.offset) || 0,
    });
    res.json(refunds);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Complete refund (webhook typically)
router.put("/:id/complete", validateRequest(completeRefundSchema) ,async (req, res) => {
  try {
    const refund = await completeRefund(req.params.id, req.body.refundId);
    res.json(refund);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Fail refund (webhook typically)
router.put("/:id/fail", validateRequest(failRefundSchema) ,async (req, res) => {
  try {
    const refund = await failRefund(req.params.id);
    res.json(refund);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
