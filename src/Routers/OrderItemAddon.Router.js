const express = require("express");
const router = express.Router();
const {
  addAddonToOrderItem,
  getOrderItemAddonById,
  updateOrderItemAddon,
  removeOrderItemAddon,
} = require("../Functionality/Orders/OrderItemAddonManagement");

// Validation
const Joi = require("joi");
const { validateRequest } = require("../Middlewares/ValidateRequest");

const addOrderItemAddonSchema = Joi.object({
  addon_id: Joi.string()
    .uuid({ version: "uuidv4" })
    .required()
    .label("Addon ID"),

  quantity: Joi.number().integer().min(1).required().label("Quantity"),

  price: Joi.number().precision(2).min(0).required().label("Price"),
});
const getOrDeleteOrderItemAddonParamsSchema = Joi.object({
  addonId: Joi.string()
    .uuid({ version: "uuidv4" })
    .required()
    .label("Addon ID"),
});
const updateOrderItemAddonSchema = Joi.object({
  quantity: Joi.number().integer().min(1).optional().label("Quantity"),

  price: Joi.number().precision(2).min(0).optional().label("Price"),
});

// Add addon to order item
router.post(
  "/order-items/:orderItemId/addons",
  validateRequest(addOrderItemAddonSchema),
  async (req, res) => {
    try {
      const addon = await addAddonToOrderItem(req.params.orderItemId, req.body);
      res.status(201).json(addon);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

// Get order item addon by ID
router.get(
  "/addons/:id",
  validateRequest(getOrDeleteOrderItemAddonParamsSchema),
  async (req, res) => {
    try {
      const addon = await getOrderItemAddonById(req.params.id);
      res.json(addon);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
);

// Update order item addon
router.put(
  "/addons/:id",
  validateRequest(updateOrderItemAddonSchema),
  async (req, res) => {
    try {
      const addon = await updateOrderItemAddon(req.params.id, req.body);
      res.json(addon);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

// Remove addon from order item
router.delete(
  "/addons/:id",
  validateRequest(getOrDeleteOrderItemAddonParamsSchema),
  async (req, res) => {
    try {
      await removeOrderItemAddon(req.params.id);
      res.json({ message: "Order item addon removed successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

module.exports = router;
