const express = require("express");
const router = express.Router();
const { upload } = require("../Utils/FileUpload");
const {validateRequest} = require("../Middlewares/ValidateRequest")
const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  updateCategoryImage,
} = require("../Functionality/MenuManagement/CategoryManagement");

// Validation for request 
const Joi = require("joi");

// Validation for creating a category
const createCategorySchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  description: Joi.string().allow("", null),
  display_order: Joi.number().integer().min(0).optional(),
  is_active: Joi.boolean().optional(),
});
// Validation for updating a category
const updateCategorySchema = Joi.object({
  name: Joi.string().min(2).max(100).optional(),
  description: Joi.string().allow("", null).optional(),
  display_order: Joi.number().integer().min(0).optional(),
  is_active: Joi.boolean().optional(),
});
// Validation for query parameters for fetching all categories
const getAllCategoriesQuerySchema = Joi.object({
  active: Joi.string().valid("true", "false").optional(), // default true
  includeItems: Joi.string().valid("true", "false").optional(),
  limit: Joi.number().integer().min(1).max(1000).optional(),
  offset: Joi.number().integer().min(0).optional(),
});
// Validation for category ID param
const categoryIdParamSchema = Joi.object({
  id: Joi.string().guid({ version: 'uuidv4' }).required() // or .regex(/^\d+$/) if numeric
});



// Create category with image
router.post("/", validateRequest(createCategorySchema) ,upload.array("images", 1), async (req, res) => {
  try {
    const category = await createCategory(req.body, req);
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all categories
router.get("/", validateRequest(getAllCategoriesQuerySchema) ,async (req, res) => {
  try {
    const categories = await getAllCategories({
      activeOnly: req.query.active !== "false",
      includeItems: req.query.includeItems === "true",
      limit: parseInt(req.query.limit) || 100,
      offset: parseInt(req.query.offset) || 0,
    });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get category by ID
router.get("/:id", validateRequest(categoryIdParamSchema) ,async (req, res) => {
  try {
    const category = await getCategoryById(
      req.params.id,
      req.query.includeItems === "true"
    );
    res.json(category);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Update category
router.put("/:id", validateRequest(updateCategorySchema) ,async (req, res) => {
  try {
    const category = await updateCategory(req.params.id, req.body);
    res.json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update category image
router.put("/:id/image", upload.array("images", 1), async (req, res) => {
  try {
    const category = await updateCategoryImage(req.params.id, req);
    res.json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete category
router.delete("/:id", validateRequest(categoryIdParamSchema) ,async (req, res) => {
  try {
    await deleteCategory(req.params.id);
    res.json({ message: "Category deactivated successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
