const { uploadImages, deleteImage } = require("../../Utils/FileUpload");
const Deal = require("../../Models/DealManagement/Deal.Model");
const DealItem = require("../../Models/DealManagement/DealItem.Model");

// Create a new deal with optional image upload
async function createDeal(dealData, req = null) {
  try {
    // Handle image upload if request is provided
    if (req && req.files && req.files.length > 0) {
      const imageUrls = await uploadImages(req, "deals");
      dealData.image_url = imageUrls[0];
    }

    const deal = await Deal.create(dealData);
    return deal;
  } catch (error) {
    console.error("Error creating deal:", error);
    throw error;
  }
}

// Get all deals with filtering options
async function getAllDeals(options = {}) {
  try {
    const {
      activeOnly = true,
      categoryId = null,
      validNow = false,
      limit = 100,
      offset = 0,
    } = options;

    const where = {};
    if (activeOnly) where.is_active = true;
    if (categoryId) where.category_id = categoryId;

    if (validNow) {
      const now = new Date();
      where.valid_from = { [sequelize.Op.lte]: now };
      where.valid_to = { [sequelize.Op.gte]: now };
    }

    const deals = await Deal.findAll({
      where,
      limit,
      offset,
      order: [["created_at", "DESC"]],
      include: [{ model: DealItem, as: "items" }],
    });

    return deals;
  } catch (error) {
    console.error("Error getting deals:", error);
    throw error;
  }
}

// Get deal by ID with optional items inclusion
async function getDealById(dealId, includeItems = false) {
  try {
    const options = {
      where: { id: dealId },
    };

    if (includeItems) {
      options.include = [{ model: DealItem, as: "items" }];
    }

    const deal = await Deal.findOne(options);

    if (!deal) {
      throw new Error("Deal not found");
    }

    return deal;
  } catch (error) {
    console.error("Error getting deal:", error);
    throw error;
  }
}

// Update deal including image update if provided
async function updateDeal(dealId, updateData, req = null) {
  try {
    const deal = await Deal.findByPk(dealId);

    if (!deal) {
      throw new Error("Deal not found");
    }

    // Handle image upload if request is provided
    if (req && req.files && req.files.length > 0) {
      // Delete old image if exists
      if (deal.image_url) {
        await deleteImage(deal.image_url);
      }

      const imageUrls = await uploadImages(req, "deals");
      updateData.image_url = imageUrls[0];
    }

    await deal.update(updateData);
    return deal;
  } catch (error) {
    console.error("Error updating deal:", error);
    throw error;
  }
}

// Delete deal (soft delete)
async function deleteDeal(dealId) {
  try {
    const deal = await Deal.findByPk(dealId);

    if (!deal) {
      throw new Error("Deal not found");
    }

    // Delete associated image if exists
    if (deal.image_url) {
      await deleteImage(deal.image_url);
    }

    // Soft delete by setting is_active to false
    await deal.update({ is_active: false });

    return { message: "Deal deactivated successfully" };
  } catch (error) {
    console.error("Error deleting deal:", error);
    throw error;
  }
}

// Update deal image
async function updateDealImage(dealId, req) {
  try {
    if (!req.files || req.files.length === 0) {
      throw new Error("No image file provided");
    }

    const deal = await Deal.findByPk(dealId);
    if (!deal) {
      throw new Error("Deal not found");
    }

    // Delete old image if exists
    if (deal.image_url) {
      await deleteImage(deal.image_url);
    }

    // Upload new image
    const imageUrls = await uploadImages(req, "deals");
    await deal.update({ image_url: imageUrls[0] });

    return deal;
  } catch (error) {
    console.error("Error updating deal image:", error);
    throw error;
  }
}

// Validate deal configuration
async function validateDealConfiguration(dealId) {
  try {
    const deal = await getDealById(dealId, true);
    const errors = [];

    // Check required items
    const requiredItems = deal.items.filter((item) => item.is_required);
    if (requiredItems.length === 0) {
      errors.push("Deal must have at least one required item");
    }

    // Check min/max selections
    if (deal.min_selections && deal.items.length < deal.min_selections) {
      errors.push(
        `Deal requires at least ${deal.min_selections} items but only has ${deal.items.length}`
      );
    }

    if (deal.max_selections && deal.items.length > deal.max_selections) {
      errors.push(
        `Deal allows maximum ${deal.max_selections} items but has ${deal.items.length}`
      );
    }

    // Check validity dates
    if (deal.valid_from && deal.valid_to && deal.valid_to <= deal.valid_from) {
      errors.push("End date must be after start date");
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  } catch (error) {
    console.error("Error validating deal:", error);
    throw error;
  }
}

// Check if deal is currently valid
function isDealValid(deal) {
  if (!deal.is_active) return false;

  const now = new Date();
  if (deal.valid_from && deal.valid_from > now) return false;
  if (deal.valid_to && deal.valid_to < now) return false;

  return true;
}

module.exports = {
  createDeal,
  getAllDeals,
  getDealById,
  updateDeal,
  deleteDeal,
  updateDealImage,
  validateDealConfiguration,
  isDealValid,
};
