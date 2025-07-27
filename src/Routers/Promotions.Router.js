const express = require("express");
const router = express.Router();
const Joi = require("joi");
const {getActivePromotions} = require("../Functionality/Promotions/ActivePromotions");
const { validateRequest } = require("../Middlewares/ValidateRequest");

const getPromotionsQuerySchema = Joi.object({
  isActive: Joi.boolean().optional(),           // e.g., ?isActive=true
  startDate: Joi.date().iso().optional(),       // e.g., ?startDate=2025-07-01
  endDate: Joi.date().iso().optional()          // e.g., ?endDate=2025-07-31
});

router.get("/", validateRequest(getPromotionsQuerySchema), getActivePromotions);

module.exports = router;