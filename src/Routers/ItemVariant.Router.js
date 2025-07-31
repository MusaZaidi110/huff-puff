const express = require("express");
const router = express.Router();
const {
  createItemVariant,
  getItemVariants,
  getVariantById,
  updateVariant,
  deleteVariant,
} = require("../Functionality/MenuManagement/ItemVariantManagement");


// Validation
const Joi = require("joi");
const { validateRequest } = require("../Middlewares/ValidateRequest");

// Schema for creating a new variant
const createVariantSchema = Joi.object({
  name: Joi.string().trim().min(1).max(100).required(),
  description: Joi.string().trim().allow(null, "").max(255),
  price: Joi.number().precision(2).min(0).required(),
  is_active: Joi.boolean().default(true),
});
// Schema for updating an existing variant
const updateVariantSchema = Joi.object({
  name: Joi.string().trim().min(1).max(100),
  description: Joi.string().trim().allow(null, "").max(255),
  price: Joi.number().precision(2).min(0),
  is_active: Joi.boolean(),
}).min(1); // Require at least one field to update

// Create variant for item
router.post("/:itemId/variants", validateRequest(createVariantSchema) ,async (req, res) => {
  try {
    const variant = await createItemVariant(req.params.itemId, req.body);
    res.status(201).json(variant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get variants for item
router.get("/:itemId/variants", async (req, res) => {
  try {
    const variants = await getItemVariants(req.params.itemId);
    res.json(variants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get variant by ID
router.get("/variants/:id", async (req, res) => {
  try {
    const variant = await getVariantById(req.params.id);
    res.json(variant);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Update variant
router.put("/variants/:id", validateRequest(updateVariantSchema) ,async (req, res) => {
  try {
    const variant = await updateVariant(req.params.id, req.body);
    res.json(variant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete variant
router.delete("/variants/:id", async (req, res) => {
  try {
    await deleteVariant(req.params.id);
    res.json({ message: "Variant deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
