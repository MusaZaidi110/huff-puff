const express = require("express");
const router = express.Router();
const { validateRequest } = require("../Middlewares/ValidateRequest");

const {
  createBranch,
  getAllBranches,
  getBranchById,
  updateBranch,
  deleteBranch,
  findNearestBranches,
  checkBranchCoverage,
  updateBranchCrowdStatus,
  getBranchesByCrowdStatus,
  searchBranches,
  filterBranches,
} = require("../Functionality/Branch/BranchManagement");

// Body and Params validation
const Joi = require("joi");

const createBranchSchema = Joi.object({
  name: Joi.string().required(),
  address: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  country: Joi.string().required(),
  delivery_available: Joi.boolean().optional(),
  location: Joi.object({
    type: Joi.string().valid("Point").required(),
    coordinates: Joi.array().items(Joi.number()).length(2).required(),
  }).required(),
  coverage_radius: Joi.number().positive().required(),
  crowd_status: Joi.string().valid("quiet", "busy", "packed").optional(),
});
const updateBranchSchema = createBranchSchema.fork([], (schema) =>
  schema.optional()
);
const getAllBranchesQuerySchema = Joi.object({
  active: Joi.string().valid("true", "false").optional(),
  delivery: Joi.string().valid("true", "false").optional(),
  limit: Joi.number().integer().min(1).optional(),
  offset: Joi.number().integer().min(0).optional(),
});
const getBranchByIdQuerySchema = Joi.object({
  include: Joi.string().valid("true", "false").optional(),
});
const nearbyBranchesQuerySchema = Joi.object({
  lat: Joi.number().required(),
  lng: Joi.number().required(),
  radius: Joi.number().integer().min(100).optional(),
  limit: Joi.number().integer().min(1).optional(),
});
const checkCoverageQuerySchema = Joi.object({
  lat: Joi.number().required(),
  lng: Joi.number().required(),
});
const updateCrowdStatusSchema = Joi.object({
  status: Joi.string().valid("quiet", "busy", "packed").required(),
});
const getBranchesByCrowdStatusParamSchema = Joi.object({
  status: Joi.string().valid("quiet", "busy", "packed").required(),
});
const searchBranchesParamSchema = Joi.object({
  term: Joi.string().required(),
});
const filterBranchesQuerySchema = Joi.object({
  city: Joi.string().optional(),
  state: Joi.string().optional(),
  country: Joi.string().optional(),
  delivery: Joi.string().valid("true", "false").optional(),
  status: Joi.string().valid("quiet", "busy", "packed").optional(),
  deals: Joi.string().valid("true", "false").optional(),
  limit: Joi.number().integer().min(1).optional(),
  offset: Joi.number().integer().min(0).optional(),
});

// Create a new branch (Admin only)
router.post("/", validateRequest(createBranchSchema), async (req, res) => {
  try {
    const branch = await createBranch(req.body);
    res.status(201).json(branch);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all branches
router.get(
  "/",
  validateRequest(getAllBranchesQuerySchema),
  async (req, res) => {
    try {
      const { active, delivery, limit, offset } = req.query;
      const branches = await getAllBranches({
        activeOnly: active !== "false",
        deliveryAvailable: delivery ? delivery === "true" : null,
        limit: parseInt(limit) || 100,
        offset: parseInt(offset) || 0,
      });
      res.json(branches);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Get branch by ID
router.get(
  "/:id",
  validateRequest(getBranchByIdQuerySchema),
  async (req, res) => {
    try {
      const branch = await getBranchById(
        req.params.id,
        req.query.include === "true"
      );
      if (!branch) {
        return res.status(404).json({ error: "Branch not found" });
      }
      res.json(branch);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Update branch (Admin only)
router.put("/:id", validateRequest(updateBranchSchema), async (req, res) => {
  try {
    const branch = await updateBranch(req.params.id, req.body);
    res.json(branch);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete branch (Admin only)
router.delete("/:id", async (req, res) => {
  try {
    await deleteBranch(req.params.id);
    res.json({ message: "Branch deactivated successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Find nearest branches
router.get(
  "/nearby/location",
  validateRequest(nearbyBranchesQuerySchema),
  async (req, res) => {
    try {
      const { lat, lng, radius, limit } = req.query;
      if (!lat || !lng) {
        return res
          .status(400)
          .json({ error: "Latitude and longitude are required" });
      }

      const branches = await findNearestBranches(
        parseFloat(lat),
        parseFloat(lng),
        parseInt(radius) || 5000,
        parseInt(limit) || 5
      );
      res.json(branches);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Check branch coverage
router.get(
  "/:id/coverage",
  validateRequest(checkCoverageQuerySchema),
  async (req, res) => {
    try {
      const { lat, lng } = req.query;
      if (!lat || !lng) {
        return res
          .status(400)
          .json({ error: "Latitude and longitude are required" });
      }

      const coverage = await checkBranchCoverage(
        req.params.id,
        parseFloat(lat),
        parseFloat(lng)
      );
      res.json(coverage);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Update crowd status (Branch manager only)
router.patch(
  "/:id/status",
  validateRequest(updateCrowdStatusSchema),
  async (req, res) => {
    try {
      const { status } = req.body;
      if (!status) {
        return res.status(400).json({ error: "Status is required" });
      }

      const branch = await updateBranchCrowdStatus(req.params.id, status);
      res.json(branch);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

// Get branches by crowd status
router.get(
  "/status/:status",
  validateRequest(getBranchesByCrowdStatusParamSchema),
  async (req, res) => {
    try {
      const branches = await getBranchesByCrowdStatus(req.params.status);
      res.json(branches);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

// Search branches
router.get(
  "/search/:term",
  validateRequest(searchBranchesParamSchema),
  async (req, res) => {
    try {
      const branches = await searchBranches(req.params.term, {
        limit: parseInt(req.query.limit) || 10,
        offset: parseInt(req.query.offset) || 0,
      });
      res.json(branches);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Filter branches
router.get(
  "/filter/all",
  validateRequest(filterBranchesQuerySchema),
  async (req, res) => {
    try {
      const branches = await filterBranches({
        city: req.query.city,
        state: req.query.state,
        country: req.query.country,
        deliveryAvailable: req.query.delivery
          ? req.query.delivery === "true"
          : undefined,
        crowdStatus: req.query.status,
        hasDeals: req.query.deals ? req.query.deals === "true" : undefined,
        limit: parseInt(req.query.limit) || 50,
        offset: parseInt(req.query.offset) || 0,
      });
      res.json(branches);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

module.exports = router;
