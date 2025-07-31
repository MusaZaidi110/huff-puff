const express = require("express");
const router = express.Router();
const {
  createOrder,
  getOrderById,
  getOrders,
  updateOrderStatus,
  cancelOrder,
  calculateOrderTotals,
} = require("../Functionality/Orders/OrderManagement");

// Validation
const Joi = require("joi");
const { validateRequest } = require("../Middlewares/ValidateRequest");

const addonSchema = Joi.object({
  id: Joi.string().uuid().optional(), // If required, make it `.required()`
  name: Joi.string().required(),
  quantity: Joi.number().integer().min(1).required(),
  unit_price: Joi.number().precision(2).min(0).required()
});
const itemSchema = Joi.object({
  id: Joi.string().uuid().optional(),
  name: Joi.string().required(),
  quantity: Joi.number().integer().min(1).required(),
  unit_price: Joi.number().precision(2).min(0).required(),
  addons: Joi.array().items(addonSchema).optional()
});
const orderSchema = Joi.object({
  customer_id: Joi.string().uuid().required(),
  branch_id: Joi.string().uuid().required(),
  delivery_fee: Joi.number().precision(2).min(0).optional(),
  promotionDiscount: Joi.number().precision(2).min(0).optional(),
  items: Joi.array().items(itemSchema).min(1).required(),
  notes: Joi.string().allow("").optional()
});
const orderIdParam = Joi.object({
  id: Joi.string().uuid().required()
});
const getOrderQuery = Joi.object({
  includeCustomer: Joi.boolean().truthy("true").falsy("false").default(false)
});
const getOrdersQuery = Joi.object({
  customerId: Joi.string().uuid().optional(),
  status: Joi.string().valid(
    "pending",
    "accepted",
    "preparing",
    "ready",
    "out_for_delivery",
    "delivered",
    "cancelled"
  ).optional(),
  branchId: Joi.string().uuid().optional(),
  fromDate: Joi.date().iso().optional(),
  toDate: Joi.date().iso().optional(),
  limit: Joi.number().integer().min(1).max(1000).default(100),
  offset: Joi.number().integer().min(0).default(0)
});
const updateStatusParams = Joi.object({
  id: Joi.string().uuid().required()
});
const updateStatusBody = Joi.object({
  status: Joi.string()
    .valid(
      "pending",
      "accepted",
      "preparing",
      "ready",
      "out_for_delivery",
      "delivered",
      "cancelled"
    )
    .required(),
  notes: Joi.string().allow("").optional()
});
const cancelOrderParams = Joi.object({
  id: Joi.string().uuid().required()
});
const cancelOrderBody = Joi.object({
  reason: Joi.string().allow("").optional()
});
const recalculateParams = Joi.object({
  id: Joi.string().uuid().required()
});



// Create new order
router.post("/", validateRequest(addonSchema, itemSchema, orderSchema) ,async (req, res) => {
  try {
    const order = await createOrder(req.body);
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get order by ID
router.get("/:id", validateRequest(orderIdParam, getOrderQuery) ,async (req, res) => {
  try {
    const order = await getOrderById(req.params.id, {
      includeCustomer: req.query.includeCustomer === "true",
    });
    res.json(order);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Get orders with filters
router.get("/", validateRequest(getOrdersQuery) ,async (req, res) => {
  try {
    const orders = await getOrders({
      customerId: req.query.customerId,
      status: req.query.status,
      branchId: req.query.branchId,
      fromDate: req.query.fromDate,
      toDate: req.query.toDate,
      limit: parseInt(req.query.limit) || 100,
      offset: parseInt(req.query.offset) || 0,
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update order status
router.put("/:id/status", validateRequest(updateStatusParams, updateStatusBody) ,async (req, res) => {
  try {
    const order = await updateOrderStatus(
      req.params.id,
      req.body.status,
      req.user.id,
      req.body.notes
    );
    res.json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Cancel order
router.put("/:id/cancel", validateRequest(cancelOrderParams, cancelOrderBody) ,async (req, res) => {
  try {
    const order = await cancelOrder(
      req.params.id,
      req.user.id,
      req.body.reason
    );
    res.json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Recalculate order totals
router.post("/:id/recalculate", validateRequest(recalculateParams) ,async (req, res) => {
  try {
    const order = await calculateOrderTotals(req.params.id);
    res.json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
