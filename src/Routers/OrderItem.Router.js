const express = require("express");
const router = express.Router();
const {
  addItemToOrder,
  getOrderItemById,
  updateOrderItem,
  removeOrderItem,
} = require("../Functionality/Orders/OrderItemManagement");

// Validation
const Joi = require("joi");
const { validateRequest } = require("../Middlewares/ValidateRequest");

// Schema for creating an order item
const addItemToOrderSchema = Joi.object({
  item_id: Joi.string().uuid().required().label("Item ID"),
  variant_id: Joi.string().uuid().optional().label("Variant ID"),
  quantity: Joi.number().integer().min(1).required().label("Quantity"),
  price: Joi.number().positive().required().label("Price"),

  // Optional addons array (if used)
  addons: Joi.array().items(
    Joi.object({
      addon_id: Joi.string().uuid().required().label("Addon ID"),
      quantity: Joi.number().integer().min(1).required().label("Addon Quantity"),
    })
  ).optional()
});
// Schema for updating an order item
const updateOrderItemSchema = Joi.object({
  quantity: Joi.number().integer().min(1).optional().label("Quantity"),
  price: Joi.number().positive().optional().label("Price"),

  // Optional updates to addons
  addons: Joi.array().items(
    Joi.object({
      addon_id: Joi.string().uuid().required().label("Addon ID"),
      quantity: Joi.number().integer().min(1).required().label("Addon Quantity"),
    })
  ).optional()
}).min(1); // Require at least one field to update

// Add item to order
router.post("/:orderId/items", validateRequest(addItemToOrderSchema) ,async (req, res) => {
  try {
    const item = await addItemToOrder(req.params.orderId, req.body);
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get order item by ID
router.get("/items/:id", async (req, res) => {
  try {
    const item = await getOrderItemById(req.params.id);
    res.json(item);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Update order item
router.put("/items/:id", validateRequest(updateOrderItemSchema) ,async (req, res) => {
  try {
    const item = await updateOrderItem(req.params.id, req.body);
    res.json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Remove item from order
router.delete("/items/:id", async (req, res) => {
  try {
    await removeOrderItem(req.params.id);
    res.json({ message: "Order item removed successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
