const express = require("express");
const router = express.Router();
const { upload } = require("../Utils/FileUpload");
const {
  createBanner,
  getBanners,
  getBannerById,
  updateBanner,
  deleteBanner,
} = require("../Functionality/Promotions/BannerManagement");


// Validations
const Joi = require("joi");
const { validateRequest } = require("../Middlewares/ValidateRequest");

const createBannerSchema = Joi.object({
  title: Joi.string().max(255).required().label("Title"),
  subtitle: Joi.string().max(500).optional().allow('').label("Subtitle"),
  banners_type: Joi.string().valid("homepage", "promo", "seasonal", "custom").required().label("Banner Type"),
  display_order: Joi.number().integer().min(0).default(0).label("Display Order"),
  start_date: Joi.date().optional().allow(null).label("Start Date"),
  end_date: Joi.date().optional().allow(null).greater(Joi.ref('start_date')).label("End Date"),
  is_active: Joi.boolean().default(true).label("Is Active"),
  branch_id: Joi.string().uuid().optional().allow(null).label("Branch ID"),
});
const updateBannerSchema = Joi.object({
  title: Joi.string().max(255).optional().label("Title"),
  subtitle: Joi.string().max(500).optional().allow('').label("Subtitle"),
  banners_type: Joi.string().valid("homepage", "promo", "seasonal", "custom").optional().label("Banner Type"),
  display_order: Joi.number().integer().min(0).optional().label("Display Order"),
  start_date: Joi.date().optional().allow(null).label("Start Date"),
  end_date: Joi.date().optional().allow(null).greater(Joi.ref('start_date')).label("End Date"),
  is_active: Joi.boolean().optional().label("Is Active"),
  branch_id: Joi.string().uuid().optional().allow(null).label("Branch ID"),
});
const bannerQuerySchema = Joi.object({
  type: Joi.string().valid("homepage", "promo", "seasonal", "custom").optional().label("Type"),
  active: Joi.string().valid("true", "false").optional().label("Active Only"),
  branchId: Joi.string().uuid().optional().label("Branch ID"),
  limit: Joi.number().integer().min(1).max(200).optional().label("Limit"),
  offset: Joi.number().integer().min(0).optional().label("Offset"),
});


// Create banner with media upload
router.post("/", validateRequest(createBannerSchema) ,upload.single("media"), async (req, res) => {
  try {
    const banner = await createBanner(req.body, req);
    res.status(201).json(banner);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get banners
router.get("/", validateRequest(bannerQuerySchema) ,async (req, res) => {
  try {
    const banners = await getBanners({
      type: req.query.type,
      activeOnly: req.query.active !== "false",
      branchId: req.query.branchId,
      limit: parseInt(req.query.limit) || 100,
      offset: parseInt(req.query.offset) || 0,
    });
    res.json(banners);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get banner by ID
router.get("/:id", async (req, res) => {
  try {
    const banner = await getBannerById(req.params.id);
    res.json(banner);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Update banner
router.put("/:id", validateRequest(updateBannerSchema) ,upload.single("media"), async (req, res) => {
  try {
    const banner = await updateBanner(req.params.id, req.body, req);
    res.json(banner);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete banner
router.delete("/:id", async (req, res) => {
  try {
    await deleteBanner(req.params.id);
    res.json({ message: "Banner deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
