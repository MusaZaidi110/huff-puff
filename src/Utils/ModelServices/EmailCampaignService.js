const EmailCampaign = require("../../Models/EmailManagement/EmailCampaign.Model");

const EmailCampaignService = {
  // Create a new EmailCampaign
  async createEmailCampaign(data) {
    return await EmailCampaign.create(data);
  },

  // Get all EmailCampaigns, optionally filtered by user_list_id or is_active
  async getAllEmailCampaigns(filters = {}) {
    const where = {};
    if (filters.user_list_id) where.user_list_id = filters.user_list_id;
    if (filters.is_active !== undefined) where.is_active = filters.is_active;

    return await EmailCampaign.findAll({ where });
  },

  // Get an EmailCampaign by ID
  async getEmailCampaignById(id) {
    return await EmailCampaign.findByPk(id);
  },

  // Update an EmailCampaign by ID
  async updateEmailCampaign(id, data) {
    const campaign = await EmailCampaign.findByPk(id);
    if (!campaign) throw new Error("EmailCampaign not found");
    await campaign.update(data);
    return campaign;
  },

  // Delete an EmailCampaign by ID
  async deleteEmailCampaign(id) {
    const campaign = await EmailCampaign.findByPk(id);
    if (!campaign) throw new Error("EmailCampaign not found");
    await campaign.destroy();
    return { message: "EmailCampaign deleted successfully" };
  },
};

module.exports = EmailCampaignService;
