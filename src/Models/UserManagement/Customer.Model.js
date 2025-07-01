const sequelize = require("../../DatabaseConnection");
const { DataTypes } = require("sequelize");

const Customer = sequelize.define(
  "Customer",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    loyalty_points: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
    loyalty_points_purchased: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    loyalty_points_gifted: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    loyalty_points_received: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    referral_code: {
      type: DataTypes.STRING,
      unique: true,
    },
    stripe_customer_id: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    tableName: "customers",
  }
);

Customer.associate = (models) => {
  Customer.belongsTo(models.User, { foreignKey: "user_id" });
  Customer.belongsTo(models.Customer, {
    as: "ReferredBy",
    foreignKey: "referred_by",
  });
  Customer.belongsTo(models.Branch, {
    as: "PreferredBranch",
    foreignKey: "preferred_branch_id",
  });
};

module.exports = Customer;
