const sequelize = require("../../DatabaseConnection");
const { DataTypes } = require("sequelize");

const LoyaltyReward = sequelize.define(
  "LoyaltyReward",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    points_required: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    min_purchase_amount: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    is_purchasable: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    point_to_dhram_ratio: {
      type: DataTypes.INTEGER,
      defaultValue: 100,
      comment: "Points per 1 DHM (configurable by admin)",
    },
    redemption_rules: {
      type: DataTypes.JSONB,
      defaultValue: {
        1000: { discount_type: "percentage", value: 50 },
        500: { discount_type: "fixed", value: 25 },
      },
    },
    reward_type: {
      type: DataTypes.ENUM(
        "discount_percentage",
        "discount_fixed",
        "free_item"
      ),
      allowNull: false,
    },
    reward_value: {
      type: DataTypes.DECIMAL(10, 2),
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    expires_at: {
      type: DataTypes.DATE,
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    tableName: "loyalty_rewards",
  }
);

LoyaltyReward.associate = (models) => {
  LoyaltyReward.belongsTo(models.Item, {
    as: "FreeItem",
    foreignKey: "free_item_id",
  });
  LoyaltyReward.hasMany(models.CustomerReward, { foreignKey: "reward_id" });
};

module.exports = LoyaltyReward;
