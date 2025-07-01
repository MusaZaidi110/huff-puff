const Staff = require("../../Models/UserManagement/Staff.Model");

const StaffService = {
  // Create a new staff member
  async create(data) {
    return await Staff.create(data);
  },

  // Get staff by ID
  async getById(id) {
    return await Staff.findByPk(id);
  },

  // Get all staff (with optional filtering by branch or user)
  async getAll(filter = {}) {
    return await Staff.findAll({ where: filter });
  },

  // Update staff by ID
  async update(id, data) {
    const staff = await Staff.findByPk(id);
    if (!staff) throw new Error("Staff not found");
    return await staff.update(data);
  },

  // Delete staff by ID
  async delete(id) {
    const staff = await Staff.findByPk(id);
    if (!staff) throw new Error("Staff not found");
    await staff.destroy();
    return true;
  },

  // Get staff by user_id
  async getByUserId(user_id) {
    return await Staff.findOne({ where: { user_id } });
  },

  // Get staff by branch_id
  async getByBranchId(branch_id) {
    return await Staff.findAll({ where: { branch_id } });
  },
};

module.exports = StaffService;
