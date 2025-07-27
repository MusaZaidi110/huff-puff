const express = require("express");
const router = express.Router();
const { validateRequest } = require("../Middlewares/ValidateRequest");
const {
  upsertBranchMenuItem,
  getBranchMenu,
  toggleMenuItemAvailability,
} = require("../Functionality/Branch/BranchMenu");

// Validate Params and Body
const Joi = require("joi");

// POST /branch-menu/ — Add or update a menu item in a branch
const upsertBranchMenuSchema = Joi.object({
  branch_id: Joi.number().integer().required(),
  item_id: Joi.number().integer().required(),
  price: Joi.number().precision(2).min(0).optional(),
  is_available: Joi.boolean().optional(),
  display_order: Joi.number().integer().optional(),
});
// GET /branch-menu/branch/:branchId
const getBranchMenuSchema = Joi.object({
  branchId: Joi.number().integer().required(),
  available: Joi.boolean().optional(), // from query string
});
// PATCH /branch-menu/:branchId/items/:itemId/toggle
const toggleMenuItemAvailabilitySchema = Joi.object({
  branchId: Joi.number().integer().required(),
  itemId: Joi.number().integer().required(),
});

// Add/update menu item in branch (Branch manager or admin)
router.post("/", validateRequest(upsertBranchMenuSchema), async (req, res) => {
  try {
    const menuItem = await upsertBranchMenuItem(
      req.body.branch_id,
      req.body.item_id,
      req.body
    );
    res.status(201).json(menuItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get branch menu
router.get(
  "/branch/:branchId",
  validateRequest(getBranchMenuSchema),
  async (req, res) => {
    try {
      const menu = await getBranchMenu(req.params.branchId, {
        availableOnly: req.query.available !== "false",
      });
      res.json(menu);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Toggle menu item availability (Branch manager or admin)
router.patch(
  "/:branchId/items/:itemId/toggle",
  validateRequest(toggleMenuItemAvailabilitySchema),
  async (req, res) => {
    try {
      const menuItem = await toggleMenuItemAvailability(
        req.params.branchId,
        req.params.itemId
      );
      res.json(menuItem);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

module.exports = router;
