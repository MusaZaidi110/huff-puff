const express = require("express");
const router = express.Router();
const {
  getOrderStatusHistory,
  addOrderStatusHistory,
} = require("../Functionality/Orders/OrderStatusHistoryManagement");

// Validation
const Joi = require("joi");
const { validateRequest } = require("../Middlewares/ValidateRequest");

const orderIdParamsSchema = Joi.object({
  orderId: Joi.string()
    .uuid({ version: "uuidv4" })
    .required()
    .label("Order ID"),
});
const addOrderStatusHistoryBodySchema = Joi.object({
  status: Joi.string()
    .valid("PENDING", "PROCESSING", "DISPATCHED", "DELIVERED", "CANCELLED")
    .required()
    .label("Order Status"),

  changed_by: Joi.string()
    .uuid({ version: "uuidv4" })
    .required()
    .label("Changed By"),

  remarks: Joi.string().max(255).optional().label("Remarks"),
});

// Get status history for order
router.get(
  "/:orderId/history",
  validateRequest(orderIdParamsSchema),
  async (req, res) => {
    try {
      const history = await getOrderStatusHistory(req.params.orderId);
      res.json(history);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Add status to order history (typically done through status update)
router.post(
  "/:orderId/history",
  validateRequest(addOrderStatusHistoryBodySchema),
  async (req, res) => {
    try {
      const historyItem = await addOrderStatusHistory(
        req.params.orderId,
        req.body
      );
      res.status(201).json(historyItem);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

module.exports = router;
