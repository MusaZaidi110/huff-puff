const User = require("../../Models/UserManagement/User.Model");

const UserService = {
  // Create a new user
  async create(data) {
    return await User.create(data);
  },

  // Get user by ID
  async getById(id) {
    return await User.findByPk(id);
  },

  // Get user by email
  async getByEmail(email) {
    return await User.findOne({ where: { email } });
  },

  // Get user by phone number
  async getByPhone(phone_number) {
    return await User.findOne({ where: { phone_number } });
  },

  // Get all users (with optional filtering)
  async getAll(filter = {}) {
    return await User.findAll({ where: filter });
  },

  // Update user by ID
  async update(id, data) {
    const user = await User.findByPk(id);
    if (!user) throw new Error("User not found");
    return await user.update(data);
  },

  // Delete user by ID
  async delete(id) {
    const user = await User.findByPk(id);
    if (!user) throw new Error("User not found");
    await user.destroy();
    return true;
  },

  // Update last login time
  async updateLastLogin(id) {
    const user = await User.findByPk(id);
    if (!user) throw new Error("User not found");
    return await user.update({ last_login_at: new Date() });
  },
};

module.exports = UserService;
