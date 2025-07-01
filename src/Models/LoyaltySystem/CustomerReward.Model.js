const sequelize = require("../../DatabaseConnection");
const { DataTypes } = require("sequelize");

const CustomerReward = sequelize.define(
  "CustomerReward",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    is_used: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    used_at: {
      type: DataTypes.DATE,
    },
    expires_at: {
      type: DataTypes.DATE,
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    tableName: "customer_rewards",
  }
);

CustomerReward.associate = (models) => {
  CustomerReward.belongsTo(models.Customer, { foreignKey: "customer_id" });
  CustomerReward.belongsTo(models.LoyaltyReward, { foreignKey: "reward_id" });
};

module.exports = CustomerReward;
