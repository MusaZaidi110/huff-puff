const { uploadImages, deleteImage } = require("../../Utils/FileUpload");
const Banner = require("../../Models/PromotionManagement/Banner.Model");
const { Op } = require("sequelize");

// Create banner with media upload
async function createBanner(bannerData, req = null) {
  try {
    if (req?.files?.length) {
      const mediaUrls = await uploadImages(req, "banners");
      if (req.files[0].mimetype.startsWith("image/")) {
        bannerData.image_url = mediaUrls[0];
      } else if (req.files[0].mimetype.startsWith("video/")) {
        bannerData.video_url = mediaUrls[0];
      }
    }

    const banner = await Banner.create(bannerData);
    return banner;
  } catch (error) {
    console.error("Error creating banner:", error);
    throw error;
  }
}

// Get banners with filtering
async function getBanners(options = {}) {
  try {
    const {
      type = null,
      activeOnly = true,
      branchId = null,
      limit = 100,
      offset = 0,
    } = options;

    const where = {};
    if (activeOnly) where.is_active = true;
    if (type) where.banners_type = type;
    if (branchId) where.branch_id = branchId;

    // Check for active date range
    if (activeOnly) {
      const now = new Date();
      where[Op.and] = [
        { [Op.or]: [{ start_date: null }, { start_date: { [Op.lte]: now } }] },
        { [Op.or]: [{ end_date: null }, { end_date: { [Op.gte]: now } }] },
      ];
    }

    const banners = await Banner.findAll({
      where,
      limit,
      offset,
      order: [
        ["display_order", "ASC"],
        ["created_at", "DESC"],
      ],
    });

    return banners;
  } catch (error) {
    console.error("Error getting banners:", error);
    throw error;
  }
}

// Get banner by ID
async function getBannerById(bannerId) {
  try {
    const banner = await Banner.findByPk(bannerId);
    if (!banner) {
      throw new Error("Banner not found");
    }
    return banner;
  } catch (error) {
    console.error("Error getting banner:", error);
    throw error;
  }
}

// Update banner
async function updateBanner(bannerId, updateData, req = null) {
  try {
    const banner = await Banner.findByPk(bannerId);
    if (!banner) {
      throw new Error("Banner not found");
    }

    if (req?.files?.length) {
      // Delete old media if exists
      if (banner.image_url) await deleteImage(banner.image_url);
      if (banner.video_url) await deleteImage(banner.video_url);

      const mediaUrls = await uploadImages(req, "banners");
      if (req.files[0].mimetype.startsWith("image/")) {
        updateData.image_url = mediaUrls[0];
        updateData.video_url = null;
      } else if (req.files[0].mimetype.startsWith("video/")) {
        updateData.video_url = mediaUrls[0];
        updateData.image_url = null;
      }
    }

    await banner.update(updateData);
    return banner;
  } catch (error) {
    console.error("Error updating banner:", error);
    throw error;
  }
}

// Delete banner
async function deleteBanner(bannerId) {
  try {
    const banner = await Banner.findByPk(bannerId);
    if (!banner) {
      throw new Error("Banner not found");
    }

    // Delete associated media
    if (banner.image_url) await deleteImage(banner.image_url);
    if (banner.video_url) await deleteImage(banner.video_url);

    await banner.destroy();
    return { message: "Banner deleted successfully" };
  } catch (error) {
    console.error("Error deleting banner:", error);
    throw error;
  }
}

module.exports = {
  createBanner,
  getBanners,
  getBannerById,
  updateBanner,
  deleteBanner,
};
