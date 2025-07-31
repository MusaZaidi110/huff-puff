const Review = require("../../Models/OrderManagement/Review.Model");
const Order = require("../../Models/OrderManagement/Order.Model");

// Create review
async function createReview(reviewData) {
  try {
    const review = await Review.create(reviewData);
    return review;
  } catch (error) {
    console.error("Error creating review:", error);
    throw error;
  }
}

// Get reviews with filtering options
async function getReviews(options = {}) {
  try {
    const {
      orderId = null,
      customerId = null,
      reviewType = null,
      minRating = null,
      maxRating = null,
      limit = 100,
      offset = 0,
    } = options;

    const where = {};
    if (orderId) where.order_id = orderId;
    if (customerId) where.customer_id = customerId;
    if (reviewType) where.review_type = reviewType;
    if (minRating !== null) where.rating = { [Op.gte]: minRating };
    if (maxRating !== null) where.rating = { [Op.lte]: maxRating };

    const reviews = await Review.findAll({
      where,
      limit,
      offset,
      order: [["created_at", "DESC"]],
      include: [{ model: Order, as: "order" }],
    });

    return reviews;
  } catch (error) {
    console.error("Error getting reviews:", error);
    throw error;
  }
}

// Get review by ID
async function getReviewById(reviewId) {
  try {
    const review = await Review.findByPk(reviewId, {
      include: [
        { model: Order, as: "order" },
        { model: Customer, as: "customer" },
      ],
    });

    if (!review) {
      throw new Error("Review not found");
    }

    return review;
  } catch (error) {
    console.error("Error getting review:", error);
    throw error;
  }
}

// Update review
async function updateReview(reviewId, updateData) {
  try {
    const review = await Review.findByPk(reviewId);
    if (!review) {
      throw new Error("Review not found");
    }

    await review.update(updateData);
    return review;
  } catch (error) {
    console.error("Error updating review:", error);
    throw error;
  }
}

// Delete review
async function deleteReview(reviewId) {
  try {
    const review = await Review.findByPk(reviewId);
    if (!review) {
      throw new Error("Review not found");
    }

    await review.destroy();
    return { message: "Review deleted successfully" };
  } catch (error) {
    console.error("Error deleting review:", error);
    throw error;
  }
}

module.exports = {
  createReview,
  getReviews,
  getReviewById,
  updateReview,
  deleteReview,
};
