const { uploadImages, deleteImage } = require("../../Utils/FileUpload");
const Promotion = require("../../Models/PromotionManagement/Promotion.Model");
const PromotionItem = require("../../Models/PromotionManagement/PromotionItem.Model");
const Item = require("../../Models/MenuManagement/Item.Model");

// Create promotion with optional image
async function createPromotion(promotionData, req = null) {
  try {
    if (req?.files?.length) {
      const imageUrls = await uploadImages(req, "promotions");
      promotionData.imageUrl = imageUrls[0];
    }

    const promotion = await Promotion.create(promotionData);
    return promotion;
  } catch (error) {
    console.error("Error creating promotion:", error);
    throw error;
  }
}

// Get active promotions
async function getActivePromotions() {
  try {
    const now = new Date();
    return await Promotion.findAll({
      where: {
        isActive: true,
        startDate: { [Op.lte]: now },
        endDate: { [Op.gte]: now },
      },
      order: [["startDate", "DESC"]],
      include: [{ model: Item, as: "items" }],
    });
  } catch (error) {
    console.error("Error getting active promotions:", error);
    throw error;
  }
}

// Get promotion by ID
async function getPromotionById(promotionId) {
  try {
    const promotion = await Promotion.findByPk(promotionId, {
      include: [{ model: Item, as: "items" }],
    });
    if (!promotion) {
      throw new Error("Promotion not found");
    }
    return promotion;
  } catch (error) {
    console.error("Error getting promotion:", error);
    throw error;
  }
}

// Update promotion
async function updatePromotion(promotionId, updateData, req = null) {
  try {
    const promotion = await Promotion.findByPk(promotionId);
    if (!promotion) {
      throw new Error("Promotion not found");
    }

    if (req?.files?.length) {
      if (promotion.imageUrl) await deleteImage(promotion.imageUrl);
      const imageUrls = await uploadImages(req, "promotions");
      updateData.imageUrl = imageUrls[0];
    }

    await promotion.update(updateData);
    return promotion;
  } catch (error) {
    console.error("Error updating promotion:", error);
    throw error;
  }
}

// Toggle promotion status
async function togglePromotionStatus(promotionId) {
  try {
    const promotion = await Promotion.findByPk(promotionId);
    if (!promotion) {
      throw new Error("Promotion not found");
    }
    await promotion.update({ isActive: !promotion.isActive });
    return promotion;
  } catch (error) {
    console.error("Error toggling promotion status:", error);
    throw error;
  }
}

// Add item to promotion
async function addItemToPromotion(promotionId, itemId) {
  try {
    const existing = await PromotionItem.findOne({
      where: { promotionId, itemId },
    });
    if (existing) {
      throw new Error("Item already exists in this promotion");
    }

    return await PromotionItem.create({ promotionId, itemId });
  } catch (error) {
    console.error("Error adding item to promotion:", error);
    throw error;
  }
}

// Remove item from promotion
async function removeItemFromPromotion(promotionId, itemId) {
  try {
    const result = await PromotionItem.destroy({
      where: { promotionId, itemId },
    });
    if (result === 0) {
      throw new Error("Item not found in this promotion");
    }
    return { message: "Item removed from promotion" };
  } catch (error) {
    console.error("Error removing item from promotion:", error);
    throw error;
  }
}

// Record promotion redemption
async function recordPromotionRedemption(promotionId, orderId, discountAmount) {
  try {
    return await PromotionRedemption.create({
      promotionId,
      orderId,
      discountAmount,
    });
  } catch (error) {
    console.error("Error recording promotion redemption:", error);
    throw error;
  }
}

module.exports = {
  createPromotion,
  getActivePromotions,
  getPromotionById,
  updatePromotion,
  togglePromotionStatus,
  addItemToPromotion,
  removeItemFromPromotion,
  recordPromotionRedemption,
};
