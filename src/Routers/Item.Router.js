const express = require("express");
const router = express.Router();
const { upload } = require("../Utils/FileUpload");
const {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
  updateItemImage,
} = require("../Functionality/MenuManagement/ItemManagement");

// Validation
const Joi = require("joi");
const { validateRequest } = require("../Middlewares/ValidateRequest");

// Common fields used for creation/updating
const baseItemSchema = {
  name: Joi.string().min(2).max(100).required(),
  description: Joi.string().allow(null, "").max(500),
  price: Joi.number().positive().required(),
  category_id: Joi.number().integer().required(),
  is_active: Joi.boolean().default(true),
  is_vegetarian: Joi.boolean().default(false),
};
// 1. Create Item
const createItemSchema = Joi.object({
  ...baseItemSchema,
});
// 2. Get All Items - Query Validation
const getAllItemsQuerySchema = Joi.object({
  active: Joi.string().valid("true", "false").optional(),
  category: Joi.number().integer().optional(),
  vegetarian: Joi.string().valid("true", "false").optional(),
  includeVariants: Joi.string().valid("true", "false").optional(),
  includeAddons: Joi.string().valid("true", "false").optional(),
  limit: Joi.number().integer().min(1).max(1000).optional(),
  offset: Joi.number().integer().min(0).optional(),
});
// 3. Get Item By ID / Delete Item By ID - Params Validation
const itemIdParamSchema = Joi.object({
  id: Joi.number().integer().required(),
});
// 4. Update Item (full payload)
const updateItemSchema = Joi.object({
  name: Joi.string().min(2).max(100).optional(),
  description: Joi.string().allow(null, "").max(500).optional(),
  price: Joi.number().positive().optional(),
  category_id: Joi.number().integer().optional(),
  is_active: Joi.boolean().optional(),
  is_vegetarian: Joi.boolean().optional(),
});
// 5. Update Item Image - no body, just files
const updateImageValidation = Joi.object({}).unknown(true); // Skip body validation, image is handled by multer



// Create item with image
router.post("/", validateRequest(createItemSchema) ,upload.array("images", 1), async (req, res) => {
  try {
    const item = await createItem(req.body, req);
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all items
router.get("/", validateRequest(getAllItemsQuerySchema) ,async (req, res) => {
  try {
    const items = await getAllItems({
      activeOnly: req.query.active !== "false",
      categoryId: req.query.category,
      vegetarianOnly: req.query.vegetarian === "true",
      includeVariants: req.query.includeVariants === "true",
      includeAddons: req.query.includeAddons === "true",
      limit: parseInt(req.query.limit) || 100,
      offset: parseInt(req.query.offset) || 0,
    });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get item by ID
router.get("/:id", validateRequest(itemIdParamSchema) ,async (req, res) => {
  try {
    const item = await getItemById(req.params.id, {
      includeVariants: req.query.includeVariants === "true",
      includeAddons: req.query.includeAddons === "true",
    });
    res.json(item);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Update item
router.put("/:id", validateRequest(updateItemSchema) ,async (req, res) => {
  try {
    const item = await updateItem(req.params.id, req.body);
    res.json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update item image
router.put("/:id/image", validateRequest(updateImageValidation) ,upload.array("images", 1), async (req, res) => {
  try {
    const item = await updateItemImage(req.params.id, req);
    res.json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete item
router.delete("/:id", validateRequest(itemIdParamSchema), async (req, res) => {
  try {
    await deleteItem(req.params.id);
    res.json({ message: "Item deactivated successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
