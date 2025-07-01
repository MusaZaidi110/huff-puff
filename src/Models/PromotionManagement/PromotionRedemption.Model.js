const sequelize = require("../../DatabaseConnection");
const { DataTypes } = require("sequelize");

const PromotionRedemption = sequelize.define(
  "PromotionRedemption",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    orderId: {
      type: DataTypes.UUID,
      references: { model: "Orders", key: "id" },
    },
    discountAmount: DataTypes.DECIMAL(10, 2),
  },
  {
    tableName: "promotion_redemptions",
    timestamps: true,
    indexes: [{ fields: ["orderId"] }],
  }
);

PromotionRedemption.associate = (models) => {
  PromotionRedemption.belongsTo(models.Promotion, {
    foreignKey: "promotionId",
  });
};

module.exports = PromotionRedemption;
