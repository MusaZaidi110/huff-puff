const EmailUserList = require("../../Models/EmailManagement/EmailUserList.Model");

const EmailUserListService = {
  // Create a new EmailUserList
  async createEmailUserList(data) {
    return await EmailUserList.create(data);
  },

  // Get all EmailUserLists, optionally filtered by name
  async getAllEmailUserLists(filter = {}) {
    const where = {};
    if (filter.name) {
      where.name = filter.name;
    }
    return await EmailUserList.findAll({ where });
  },

  // Get an EmailUserList by ID
  async getEmailUserListById(id) {
    return await EmailUserList.findByPk(id);
  },

  // Update an EmailUserList by ID
  async updateEmailUserList(id, data) {
    const list = await EmailUserList.findByPk(id);
    if (!list) throw new Error("EmailUserList not found");
    await list.update(data);
    return list;
  },

  // Delete an EmailUserList by ID
  async deleteEmailUserList(id) {
    const list = await EmailUserList.findByPk(id);
    if (!list) throw new Error("EmailUserList not found");
    await list.destroy();
    return { message: "EmailUserList deleted successfully" };
  },
};

module.exports = EmailUserListService;
