const sequelize = require("../../DatabaseConnection");
const { DataTypes } = require("sequelize");

const BranchDeal = sequelize.define(
  "BranchDeal",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    deal_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "deals",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
      validate: {
        notNull: {
          msg: "Deal ID is required"
        }
      }
    },
    branch_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "branches",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
      validate: {
        notNull: {
          msg: "Branch ID is required"
        }
      }
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    display_order: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0
      }
    },
    start_date: {
      type: DataTypes.DATE,
      validate: {
        isDate: true,
        isAfterOrEqualDealStart(value) {
          if (this.deal && value < this.deal.valid_from) {
            throw new Error('Branch deal start date cannot be before the main deal start date');
          }
        }
      }
    },
    end_date: {
      type: DataTypes.DATE,
      validate: {
        isDate: true,
        isAfterStartDate(value) {
          if (value && this.start_date && value <= this.start_date) {
            throw new Error('End date must be after start date');
          }
        },
        isBeforeOrEqualDealEnd(value) {
          if (this.deal && value > this.deal.valid_to) {
            throw new Error('Branch deal end date cannot be after the main deal end date');
          }
        }
      }
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    tableName: "branch_deals",
    indexes: [
      {
        unique: true,
        fields: ["deal_id", "branch_id"],
        name: "unique_branch_deal"
      },
      {
        fields: ["is_active"]
      },
      {
        fields: ["branch_id"]
      },
      {
        fields: ["display_order"]
      }
    ],
    hooks: {
      beforeCreate: async (branchDeal) => {
        const existing = await BranchDeal.findOne({
          where: {
            deal_id: branchDeal.deal_id,
            branch_id: branchDeal.branch_id
          }
        });
        
        if (existing) {
          throw new Error('This deal is already assigned to this branch');
        }
      },
      beforeUpdate: async (branchDeal) => {
        if (branchDeal.changed('deal_id') || branchDeal.changed('branch_id')) {
          const existing = await BranchDeal.findOne({
            where: {
              deal_id: branchDeal.deal_id,
              branch_id: branchDeal.branch_id,
              id: { [sequelize.Op.ne]: branchDeal.id }
            }
          });
          
          if (existing) {
            throw new Error('This deal is already assigned to this branch');
          }
        }
      }
    },
    validate: {
      validDateRange() {
        if (this.start_date && this.end_date && this.end_date <= this.start_date) {
          throw new Error('End date must be after start date');
        }
      }
    }
  }
);

// Enhanced Associations
BranchDeal.associate = (models) => {
  BranchDeal.belongsTo(models.Deal, {
    foreignKey: "deal_id",
    as: "deal",
    hooks: true  // Ensures hooks run when association is changed
  });
  
  BranchDeal.belongsTo(models.Branch, {
    foreignKey: "branch_id",
    as: "branch",
    hooks: true
  });

  // Add method to check if deal is currently active
  BranchDeal.prototype.isCurrentlyActive = function() {
    const now = new Date();
    return this.is_active &&
      (!this.start_date || this.start_date <= now) &&
      (!this.end_date || this.end_date >= now);
  };
};

module.exports = BranchDeal;



// Get all active deals for a specific branch
// const branchDeals = await BranchDeal.findAll({
//   where: { 
//     branch_id: targetBranchId,
//     is_active: true
//   },
//   include: [{ model: Deal, as: 'deal' }]
// });
// Filter only currently active (within date range)
// const activeDeals = branchDeals.filter(bd => bd.isCurrentlyActive());