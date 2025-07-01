const Banners = require("../../Models/PromotionManagement/Banner.Model");

const BannersService = {
  // Create a new banner
  async createBanner(data) {
    return await Banners.create(data);
  },

  // Get all banners with optional filters (e.g., active, type, branch_id)
  async getAllBanners(filter = {}) {
    return await Banners.findAll({
      where: filter,
      order: [["display_order", "ASC"], ["start_date", "DESC"]],
    });
  },

  // Get banner by ID
  async getBannerById(id) {
    const banner = await Banners.findByPk(id);
    if (!banner) throw new Error("Banner not found");
    return banner;
  },

  // Update banner by ID
  async updateBanner(id, data) {
    const banner = await Banners.findByPk(id);
    if (!banner) throw new Error("Banner not found");
    await banner.update(data);
    return banner;
  },

  // Delete banner by ID
  async deleteBanner(id) {
    const banner = await Banners.findByPk(id);
    if (!banner) throw new Error("Banner not found");
    await banner.destroy();
    return { message: "Banner deleted successfully" };
  },

  // Get active banners for a given type and optionally branch
  async getActiveBanners(type, branch_id = null) {
    const filter = {
      is_active: true,
      banners_type: type,
    };
    if (branch_id) {
      filter.branch_id = branch_id;
    }
    const now = new Date();
    filter.start_date = { [Banners.sequelize.Op.lte]: now };
    filter.end_date = { [Banners.sequelize.Op.or]: [{ [Banners.sequelize.Op.gte]: now }, null] };

    return await Banners.findAll({
      where: filter,
      order: [["display_order", "ASC"]],
    });
  },
};

module.exports = BannersService;
