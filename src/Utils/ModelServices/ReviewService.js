const Review = require("../../Models/OrderManagement/Review.Model");

const ReviewService = {
  // Create a new review
  async createReview(data) {
    return await Review.create(data);
  },

  // Get all reviews, optionally filtered by criteria (e.g., customer_id, order_id, review_type)
  async getAllReviews(filter = {}) {
    return await Review.findAll({
      where: filter,
      order: [["created_at", "DESC"]],
    });
  },

  // Get review by ID with optional associations
  async getReviewById(id, includeAssociations = true) {
    const include = includeAssociations ? ["Order", "Customer"] : [];
    const review = await Review.findByPk(id, { include });
    if (!review) throw new Error("Review not found");
    return review;
  },

  // Update a review by ID
  async updateReview(id, data) {
    const review = await Review.findByPk(id);
    if (!review) throw new Error("Review not found");
    await review.update(data);
    return review;
  },

  // Delete a review by ID
  async deleteReview(id) {
    const review = await Review.findByPk(id);
    if (!review) throw new Error("Review not found");
    await review.destroy();
    return { message: "Review deleted successfully" };
  },

  // Get all reviews for a specific order
  async getReviewsByOrderId(order_id) {
    return await Review.findAll({
      where: { order_id },
      order: [["created_at", "DESC"]],
    });
  },

  // Get all reviews for a specific customer
  async getReviewsByCustomerId(customer_id) {
    return await Review.findAll({
      where: { customer_id },
      order: [["created_at", "DESC"]],
    });
  },
};

module.exports = ReviewService;
