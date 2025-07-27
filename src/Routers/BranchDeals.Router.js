const express = require("express");
const router = express.Router();
const { validateRequest } = require("../Middlewares/ValidateRequest");
const {
  addDealToBranch,
  getActiveBranchDeals,
  updateBranchDeal,
  removeDealFromBranch,
} = require("../Functionality/Branch/BranchDeal");

// Validation Params and Body
// Joi validation schemas for Branch Deals
const Joi = require("joi");

// 1. POST /branch-deals/ — Add deal to branch
const addDealToBranchSchema = Joi.object({
  branch_id: Joi.number().integer().required().messages({
    "any.required": "Branch ID is required",
    "number.base": "Branch ID must be a number",
  }),
  deal_id: Joi.number().integer().required().messages({
    "any.required": "Deal ID is required",
    "number.base": "Deal ID must be a number",
  }),
  start_date: Joi.date().optional().allow(null),
  end_date: Joi.date().optional().allow(null),
  is_active: Joi.boolean().optional(),
  display_order: Joi.number().integer().optional(),
});
// 2. GET /branch-deals/branch/:branchId — Get active branch deals
const getActiveBranchDealsParamsSchema = Joi.object({
  branchId: Joi.number().integer().required().messages({
    "any.required": "Branch ID is required",
    "number.base": "Branch ID must be a number",
  }),
  date: Joi.date().optional(),
});
// 3. PUT /branch-deals/:id — Update branch deal
const updateBranchDealParamsSchema = Joi.object({
  id: Joi.number().integer().required().messages({
    "any.required": "BranchDeal ID is required",
    "number.base": "BranchDeal ID must be a number",
  }),
  branch_id: Joi.number().integer().optional(),
  deal_id: Joi.number().integer().optional(),
  start_date: Joi.date().optional().allow(null),
  end_date: Joi.date().optional().allow(null),
  is_active: Joi.boolean().optional(),
  display_order: Joi.number().integer().optional(),
});
// 4. DELETE /branch-deals/:id — Remove deal from branch
const removeBranchDealParamsSchema = Joi.object({
  id: Joi.number().integer().required().messages({
    "any.required": "BranchDeal ID is required",
    "number.base": "BranchDeal ID must be a number",
  }),
});

// Add deal to branch (Admin only)
router.post("/", validateRequest(addDealToBranchSchema), async (req, res) => {
  try {
    const branchDeal = await addDealToBranch(
      req.body.branch_id,
      req.body.deal_id,
      req.body
    );
    res.status(201).json(branchDeal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get active deals for branch
router.get(
  "/branch/:branchId",
  validateRequest(getActiveBranchDealsParamsSchema),
  async (req, res) => {
    try {
      const deals = await getActiveBranchDeals(req.params.branchId, {
        currentDate: req.query.date ? new Date(req.query.date) : new Date(),
      });
      res.json(deals);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Update branch deal (Admin only)
router.put(
  "/:id",
  validateRequest(updateBranchDealParamsSchema),
  async (req, res) => {
    try {
      const branchDeal = await updateBranchDeal(req.params.id, req.body);
      res.json(branchDeal);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

// Remove deal from branch (Admin only)
router.delete(
  "/:id",
  validateRequest(removeBranchDealParamsSchema),
  async (req, res) => {
    try {
      await removeDealFromBranch(req.params.id);
      res.json({ message: "Deal removed from branch successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

module.exports = router;
