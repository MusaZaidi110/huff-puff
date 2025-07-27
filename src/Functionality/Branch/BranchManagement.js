const Branch = require("../../Models/BranchManagement/Branch.Model");
const BranchDeal = require("../../Models/BranchManagement/BranchDeal.Model");
const BranchMenu = require("../../Models/BranchManagement/BranchMenu.Model");

async function createBranch(branchData) {
  try {
    // Creating a new branch
    const branch = await Branch.create(branchData);
    return branch;
  } catch (error) {
    console.error("Error creating branch:", error);
    throw error;
  }
}

async function updateBranch(branchId, updateData) {
  try {
    const branch = await Branch.findByPk(branchId);

    if (!branch) {
      throw new Error("Branch not found");
    }

    // Prevent updating location if not provided
    if (updateData.location && !updateData.location.coordinates) {
      delete updateData.location;
    }

    await branch.update(updateData);
    return branch;
  } catch (error) {
    console.error("Error updating branch:", error);
    throw error;
  }
}

async function deleteBranch(branchId) {
  try {
    const branch = await Branch.findByPk(branchId);

    if (!branch) {
      throw new Error("Branch not found");
    }

    // Soft delete by setting is_active to false
    await branch.update({ is_active: false });

    // Also deactivate related branch deals
    await BranchDeal.update(
      { is_active: false },
      { where: { branch_id: branchId } }
    );

    return { message: "Branch deactivated successfully" };
  } catch (error) {
    console.error("Error deleting branch:", error);
    throw error;
  }
}

async function getAllBranches(options = {}) {
  try {
    const {
      activeOnly = true,
      deliveryAvailable = null,
      limit = 100,
      offset = 0,
    } = options;

    const where = {};
    if (activeOnly) where.is_active = true;
    if (deliveryAvailable !== null)
      where.delivery_available = deliveryAvailable;

    const branches = await Branch.findAll({
      where,
      limit,
      offset,
      order: [["name", "ASC"]],
    });

    return branches;
  } catch (error) {
    console.error("Error getting branches:", error);
    throw error;
  }
}

async function getBranchById(branchId, includeAssociations = false) {
  try {
    const options = {
      where: { id: branchId },
    };

    if (includeAssociations) {
      options.include = [
        { model: BranchDeal, as: "deals", where: { is_active: true } },
        { model: BranchMenu, as: "menu", where: { is_available: true } },
      ];
    }

    const branch = await Branch.findOne(options);

    if (!branch) {
      throw new Error("Branch not found");
    }

    return branch;
  } catch (error) {
    console.error("Error getting branch:", error);
    throw error;
  }
}

async function findNearestBranches(
  latitude,
  longitude,
  radius = 5000,
  limit = 5
) {
  try {
    const branches = await Branch.findAll({
      where: {
        is_active: true,
        [sequelize.Op.and]: [
          sequelize.where(
            sequelize.fn(
              "ST_DWithin",
              sequelize.col("location"),
              sequelize.fn(
                "ST_SetSRID",
                sequelize.fn("ST_MakePoint", longitude, latitude),
                4326
              ),
              radius
            ),
            true
          ),
        ],
      },
      order: [
        [
          sequelize.fn(
            "ST_Distance",
            sequelize.col("location"),
            sequelize.fn(
              "ST_SetSRID",
              sequelize.fn("ST_MakePoint", longitude, latitude),
              4326
            )
          ),
          "ASC",
        ],
      ],
      limit,
    });

    // Add distance in km to each branch
    const branchesWithDistance = branches.map((branch) => {
      const distance = getDistanceFromLatLon(
        latitude,
        longitude,
        branch.location.coordinates[1],
        branch.location.coordinates[0]
      );
      return { ...branch.toJSON(), distance };
    });

    return branchesWithDistance;
  } catch (error) {
    console.error("Error finding nearest branches:", error);
    throw error;
  }
}

async function checkBranchCoverage(branchId, latitude, longitude) {
  try {
    const branch = await Branch.findByPk(branchId, {
      attributes: ["id", "location", "coverage_radius"],
    });

    if (!branch) {
      throw new Error("Branch not found");
    }

    const distance = getDistanceFromLatLon(
      latitude,
      longitude,
      branch.location.coordinates[1],
      branch.location.coordinates[0]
    );

    const isWithinCoverage = distance * 1000 <= branch.coverage_radius; // Convert km to meters

    return {
      branchId: branch.id,
      distance,
      coverageRadius: branch.coverage_radius / 1000, // in km
      isWithinCoverage,
      message: isWithinCoverage
        ? "Location is within coverage area"
        : "Location is outside coverage area",
    };
  } catch (error) {
    console.error("Error checking branch coverage:", error);
    throw error;
  }
}

async function updateBranchCrowdStatus(branchId, status) {
  try {
    const validStatuses = ['quiet', 'busy', 'packed'];
    if (!validStatuses.includes(status)) {
      throw new Error('Invalid status value');
    }

    const branch = await Branch.findByPk(branchId);
    if (!branch) {
      throw new Error('Branch not found');
    }

    await branch.update({ 
      crowd_status: status,
      status_updated_at: new Date()
    });

    return branch;
  } catch (error) {
    console.error('Error updating branch crowd status:', error);
    throw error;
  }
}


async function getBranchesByCrowdStatus(status) {
  try {
    const validStatuses = ['quiet', 'busy', 'packed'];
    if (!validStatuses.includes(status)) {
      throw new Error('Invalid status value');
    }

    const branches = await Branch.findAll({
      where: { 
        crowd_status: status,
        is_active: true 
      },
      order: [['status_updated_at', 'DESC']]
    });

    return branches;
  } catch (error) {
    console.error('Error getting branches by crowd status:', error);
    throw error;
  }
}


async function searchBranches(searchTerm, options = {}) {
  try {
    const { limit = 10, offset = 0 } = options;
    
    const branches = await Branch.findAll({
      where: {
        is_active: true,
        [sequelize.Op.or]: [
          { name: { [sequelize.Op.iLike]: `%${searchTerm}%` } },
          { city: { [sequelize.Op.iLike]: `%${searchTerm}%` } },
          { state: { [sequelize.Op.iLike]: `%${searchTerm}%` } }
        ]
      },
      limit,
      offset,
      order: [['name', 'ASC']]
    });

    return branches;
  } catch (error) {
    console.error('Error searching branches:', error);
    throw error;
  }
}


async function filterBranches(criteria = {}) {
  try {
    const {
      city,
      state,
      country,
      deliveryAvailable,
      crowdStatus,
      hasDeals,
      limit = 50,
      offset = 0
    } = criteria;
    
    const where = { is_active: true };
    
    if (city) where.city = { [sequelize.Op.iLike]: city };
    if (state) where.state = { [sequelize.Op.iLike]: state };
    if (country) where.country = { [sequelize.Op.iLike]: country };
    if (deliveryAvailable !== undefined) where.delivery_available = deliveryAvailable;
    if (crowdStatus) where.crowd_status = crowdStatus;

    const include = [];
    
    if (hasDeals) {
      include.push({
        model: BranchDeal,
        as: 'deals',
        where: { is_active: true },
        required: true
      });
    }

    const branches = await Branch.findAll({
      where,
      include,
      limit,
      offset,
      order: [['name', 'ASC']],
      distinct: true
    });

    return branches;
  } catch (error) {
    console.error('Error filtering branches:', error);
    throw error;
  }
}

module.exports = {
  createBranch,
  updateBranch,
  deleteBranch,
  getAllBranches,
  getBranchById,
  findNearestBranches,
  checkBranchCoverage,
  updateBranchCrowdStatus,
  getBranchesByCrowdStatus,
  searchBranches,
  filterBranches
};
