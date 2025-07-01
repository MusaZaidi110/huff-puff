const Branch = require("../../Models/BranchManagement/Branch.Model");

const BranchService = {
  // Create a new branch
  async createBranch(data) {
    return await Branch.create(data);
  },

  // Get all branches (optionally filter active only)
  async getAllBranches({ activeOnly = false } = {}) {
    const where = activeOnly ? { is_active: true } : {};
    return await Branch.findAll({ where });
  },

  // Get a single branch by ID
  async getBranchById(id) {
    return await Branch.findByPk(id);
  },

  // Update a branch by ID
  async updateBranch(id, data) {
    const branch = await Branch.findByPk(id);
    if (!branch) {
      throw new Error("Branch not found");
    }
    await branch.update(data);
    return branch;
  },

  // Delete a branch by ID (soft delete or hard delete depending on your logic)
  async deleteBranch(id) {
    const branch = await Branch.findByPk(id);
    if (!branch) {
      throw new Error("Branch not found");
    }
    await branch.destroy(); // Or: branch.update({ is_active: false }) for soft delete
    return { message: "Branch deleted successfully" };
  },

  // Find NearBy Branches with Radius Dynamic Raduis Meter
  async findNearbyBranches(userLat, userLng, radiusMeters = 5000) {
    const point = `POINT(${userLng} ${userLat})`;

    return await Branch.findAll({
      where: sequelize.where(
        sequelize.fn(
          "ST_DWithin",
          sequelize.col("location"),
          sequelize.fn("ST_GeogFromText", point),
          radiusMeters
        ),
        true
      ),
      order: [
        [
          sequelize.fn(
            "ST_Distance",
            sequelize.col("location"),
            sequelize.fn("ST_GeogFromText", point)
          ),
          "ASC",
        ],
      ],
      limit: 10,
    });
  },
};

module.exports = BranchService;
