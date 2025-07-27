const express = require("express");
const router = express.Router();
const { upload } = require("../Utils/FileUpload");
const {
  createDeal,
  getAllDeals,
  getDealById,
  updateDeal,
  deleteDeal,
  updateDealImage,
  validateDealConfiguration,
} = require("../Functionality/Deals/DealManagement");

const {
  addItemToDeal,
  getDealItems,
  updateDealItem,
  removeItemFromDeal,
} = require("../Functionality/Deals/DealItems");

// Validate deal configuration
const Joi = require("joi");
const {validateRequest} = require("../Middlewares/ValidateRequest");
// Common
const idSchema = Joi.string().uuid().required();
const optionalIdSchema = Joi.string().uuid();

// Create Deal
const createDealSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().allow(""),
  category_id: optionalIdSchema,
  is_active: Joi.boolean().default(true),
  valid_from: Joi.date().required(),
  valid_to: Joi.date().required(),
  min_selections: Joi.number().integer().min(0),
  max_selections: Joi.number().integer().min(0),
});
// Update Deal
const updateDealSchema = Joi.object({
  name: Joi.string(),
  description: Joi.string().allow(""),
  category_id: optionalIdSchema,
  is_active: Joi.boolean(),
  valid_from: Joi.date(),
  valid_to: Joi.date(),
  min_selections: Joi.number().integer().min(0),
  max_selections: Joi.number().integer().min(0),
});
// Query params for getAllDeals
const getAllDealsQuerySchema = Joi.object({
  active: Joi.string().valid("true", "false"),
  category: optionalIdSchema,
  validNow: Joi.string().valid("true", "false"),
  limit: Joi.number().integer().min(1).max(1000),
  offset: Joi.number().integer().min(0),
});
// Query param for getDealById
const getDealByIdQuerySchema = Joi.object({
  includeItems: Joi.string().valid("true", "false"),
});
// Deal Item
const dealItemSchema = Joi.object({
  item_id: idSchema,
  item_type: Joi.string().valid("base", "addon", "variant").required(),
  variant_id: optionalIdSchema,
  addon_id: optionalIdSchema,
  is_required: Joi.boolean(),
});

const updateDealItemSchema = Joi.object({
  item_type: Joi.string().valid("base", "addon", "variant"),
  is_required: Joi.boolean(),
  variant_id: optionalIdSchema,
  addon_id: optionalIdSchema,
});



// Create deal with potential image upload
router.post("/", validateRequest(createDealSchema) ,upload.array("images", 1), async (req, res) => {
  try {
    const deal = await createDeal(req.body, req);
    res.status(201).json(deal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all deals
router.get("/", validateRequest(getAllDealsQuerySchema) ,async (req, res) => {
  try {
    const deals = await getAllDeals({
      activeOnly: req.query.active !== "false",
      categoryId: req.query.category,
      validNow: req.query.validNow === "true",
      limit: parseInt(req.query.limit) || 100,
      offset: parseInt(req.query.offset) || 0,
    });
    res.json(deals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get deal by ID
router.get("/:id", validateRequest(getDealByIdQuerySchema) ,async (req, res) => {
  try {
    const deal = await getDealById(
      req.params.id,
      req.query.includeItems === "true"
    );
    res.json(deal);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Update deal
router.put("/:id", validateRequest(updateDealSchema) ,async (req, res) => {
  try {
    const deal = await updateDeal(req.params.id, req.body);
    res.json(deal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update deal image
router.put("/:id/image", upload.array("images", 1), async (req, res) => {
  try {
    const deal = await updateDealImage(req.params.id, req);
    res.json(deal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete deal
router.delete("/:id", async (req, res) => {
  try {
    await deleteDeal(req.params.id);
    res.json({ message: "Deal deactivated successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Validate deal configuration
router.get("/:id/validate", async (req, res) => {
  try {
    const validation = await validateDealConfiguration(req.params.id);
    res.json(validation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Deal Items Routes
router.post("/:id/items", validateRequest(dealItemSchema) ,async (req, res) => {
  try {
    const dealItem = await addItemToDeal(req.params.id, req.body);
    res.status(201).json(dealItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/:id/items", async (req, res) => {
  try {
    const dealItems = await getDealItems(req.params.id);
    res.json(dealItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/items/:itemId", validateRequest(updateDealItemSchema) ,async (req, res) => {
  try {
    const dealItem = await updateDealItem(req.params.itemId, req.body);
    res.json(dealItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/items/:itemId", async (req, res) => {
  try {
    await removeItemFromDeal(req.params.itemId);
    res.json({ message: "Item removed from deal successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
