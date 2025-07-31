const express = require("express");
const router = express.Router();
const {
  createReview,
  getReviews,
  getReviewById,
  updateReview,
  deleteReview,
} = require("../Functionality/Orders/ReviewManagement");

// Validation
const Joi = require("joi");
const { validateRequest } = require("../Middlewares/ValidateRequest");

const createReviewSchema = Joi.object({
  order_id: Joi.string().uuid().required().label("Order ID"),
  review_type: Joi.string()
    .valid("product", "service", "experience")
    .required()
    .label("Review Type"),
  rating: Joi.number().min(1).max(5).required().label("Rating"),
  comment: Joi.string().allow("", null).label("Comment"),
});
const getReviewsQuerySchema = Joi.object({
  orderId: Joi.string().uuid().optional().label("Order ID"),
  customerId: Joi.string().uuid().optional().label("Customer ID"),
  type: Joi.string()
    .valid("product", "service", "experience")
    .optional()
    .label("Review Type"),
  minRating: Joi.number().min(1).max(5).optional().label("Minimum Rating"),
  maxRating: Joi.number().min(1).max(5).optional().label("Maximum Rating"),
  limit: Joi.number().integer().min(1).default(100).label("Limit"),
  offset: Joi.number().integer().min(0).default(0).label("Offset"),
});
const getReviewByIdParamsSchema = Joi.object({
  id: Joi.string().uuid().required().label("Review ID"),
});
const updateReviewParamsSchema = Joi.object({
  id: Joi.string().uuid().required().label("Review ID"),
});
const updateReviewBodySchema = Joi.object({
  review_type: Joi.string()
    .valid("product", "service", "experience")
    .optional()
    .label("Review Type"),
  rating: Joi.number().min(1).max(5).optional().label("Rating"),
  comment: Joi.string().allow("", null).optional().label("Comment"),
});

// Create review
router.post("/", validateRequest(createReviewSchema), async (req, res) => {
  try {
    const review = await createReview({
      ...req.body,
      customer_id: req.user.id,
    });
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get reviews with filters
router.get("/", validateRequest(getReviewsQuerySchema), async (req, res) => {
  try {
    const reviews = await getReviews({
      orderId: req.query.orderId,
      customerId: req.query.customerId,
      reviewType: req.query.type,
      minRating: req.query.minRating ? parseInt(req.query.minRating) : null,
      maxRating: req.query.maxRating ? parseInt(req.query.maxRating) : null,
      limit: parseInt(req.query.limit) || 100,
      offset: parseInt(req.query.offset) || 0,
    });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get review by ID
router.get(
  "/:id",
  validateRequest(getReviewByIdParamsSchema),
  async (req, res) => {
    try {
      const review = await getReviewById(req.params.id);
      res.json(review);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
);

// Update review
router.put(
  "/:id",
  validateRequest(updateReviewParamsSchema, updateReviewBodySchema),
  async (req, res) => {
    try {
      const review = await updateReview(req.params.id, req.body);
      res.json(review);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

// Delete review
router.delete(
  "/:id",
  validateRequest(getReviewByIdParamsSchema),
  async (req, res) => {
    try {
      await deleteReview(req.params.id);
      res.json({ message: "Review deleted successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

module.exports = router;
