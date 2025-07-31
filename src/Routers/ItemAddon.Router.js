const express = require("express");
const router = express.Router();
const {
  createItemAddon,
  getItemAddons,
  getAddonById,
  updateAddon,
  deleteAddon,
} = require("../Functionality/MenuManagement/ItemAddonManagement");

// Validation
const Joi = require("joi");
const { validateRequest } = require("../Middlewares/ValidateRequest");

// Validation for creating an item addon
const createAddonSchema = Joi.object({
  name: Joi.string().trim().min(1).max(100).required(),
  description: Joi.string().trim().allow(null, "").max(255),
  price: Joi.number().precision(2).min(0).required(),
  is_active: Joi.boolean().default(true),
});
// Validation for updating an item addon
const updateAddonSchema = Joi.object({
  name: Joi.string().trim().min(1).max(100),
  description: Joi.string().trim().allow(null, "").max(255),
  price: Joi.number().precision(2).min(0),
  is_active: Joi.boolean(),
}).min(1); // Must send at least one field for update
// For :itemId and :id route parameters
const itemIdParamSchema = Joi.object({
  itemId: Joi.string()
    .uuid({ version: "uuidv4" }) // optional: ensure it's v4
    .required()
    .label("Item ID"),
});
const idParamSchema = Joi.object({
  Id: Joi.string()
    .uuid({ version: "uuidv4" }) // optional: ensure it's v4
    .required()
    .label("ID"),
});

// Create addon for item
router.post(
  "/:itemId/addons",
  validateRequest(createAddonSchema),
  async (req, res) => {
    try {
      const addon = await createItemAddon(req.params.itemId, req.body);
      res.status(201).json(addon);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

// Get addons for item
router.get(
  "/:itemId/addons",
  validateRequest(itemIdParamSchema),
  async (req, res) => {
    try {
      const addons = await getItemAddons(req.params.itemId);
      res.json(addons);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Get addon by ID
router.get("/addons/:id", validateRequest(idParamSchema), async (req, res) => {
  try {
    const addon = await getAddonById(req.params.id);
    res.json(addon);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Update addon
router.put(
  "/addons/:id",
  validateRequest(updateAddonSchema),
  async (req, res) => {
    try {
      const addon = await updateAddon(req.params.id, req.body);
      res.json(addon);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

// Delete addon
router.delete(
  "/addons/:id",
  validateRequest(idParamSchema),
  async (req, res) => {
    try {
      await deleteAddon(req.params.id);
      res.json({ message: "Addon deleted successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

module.exports = router;
