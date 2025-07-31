const express = require("express");
const router = express.Router();
const { upload } = require("../Utils/FileUpload");
const {
  createPromotion,
  getActivePromotions,
  getPromotionById,
  updatePromotion,
  togglePromotionStatus,
  addItemToPromotion,
  removeItemFromPromotion,
} = require("../Functionality/Promotions/PromotionManagement");

// Validations
const Joi = require("joi");
const { validateRequest } = require("../Middlewares/ValidateRequest");

// Enum options
const discountTypes = ["percentage", "flat"]; // Adjust as needed
// Create or Update Promotion Schema
const promotionSchema = Joi.object({
  title: Joi.string().min(3).max(100).required().label("Title"),
  description: Joi.string().optional().allow("").label("Description"),
  startDate: Joi.date().iso().required().label("Start Date"),
  endDate: Joi.date()
    .iso()
    .required()
    .greater(Joi.ref("startDate"))
    .label("End Date"),

  discountType: Joi.string()
    .valid(...discountTypes)
    .required()
    .label("Discount Type"),

  discountValue: Joi.number().positive().required().label("Discount Value"),

  isActive: Joi.boolean().optional().label("Is Active"),
  imageUrl: Joi.string().uri().optional().label("Image URL"), // For server-side image handling
});
// UUID param validator
const idParamSchema = Joi.string()
  .guid({ version: "uuidv4" })
  .required()
  .label("Promotion ID");
// Add/Remove item schema
const itemRelationSchema = Joi.object({
  id: idParamSchema,
  itemId: Joi.string().guid({ version: "uuidv4" }).required().label("Item ID"),
});

// Create promotion
router.post(
  "/",
  validateRequest(promotionSchema),
  upload.single("image"),
  async (req, res) => {
    try {
      const promotion = await createPromotion(req.body, req);
      res.status(201).json(promotion);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

// Get active promotions
router.get("/active", async (req, res) => {
  try {
    const promotions = await getActivePromotions();
    res.json(promotions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get promotion by ID
router.get("/:id", validateRequest(idParamSchema), async (req, res) => {
  try {
    const promotion = await getPromotionById(req.params.id);
    res.json(promotion);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Update promotion
router.put(
  "/:id",
  validateRequest(idParamSchema),
  upload.single("image"),
  async (req, res) => {
    try {
      const promotion = await updatePromotion(req.params.id, req.body, req);
      res.json(promotion);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

// Toggle promotion status
router.patch(
  "/:id/toggle-status",
  validateRequest(idParamSchema),
  async (req, res) => {
    try {
      const promotion = await togglePromotionStatus(req.params.id);
      res.json(promotion);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

// Add item to promotion
router.post(
  "/:id/items/:itemId",
  validateRequest(itemRelationSchema),
  async (req, res) => {
    try {
      const result = await addItemToPromotion(req.params.id, req.params.itemId);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

// Remove item from promotion
router.delete("/:id/items/:itemId", async (req, res) => {
  try {
    await removeItemFromPromotion(req.params.id, req.params.itemId);
    res.json({ message: "Item removed from promotion" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
