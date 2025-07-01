const sequelize = require("../../DatabaseConnection");
const { DataTypes } = require("sequelize");

const PromotionItem = sequelize.define(
  "PromotionItem",
  {
    promotionId: {
      type: DataTypes.UUID,
      primaryKey: true,
      references: { model: "Promotions", key: "id" },
    },
    itemId: {
      type: DataTypes.UUID,
      primaryKey: true,
      references: { model: "Items", key: "id" },
    },
  },
  {
    tableName: "promotion_items",
    timestamps: false,
  }
);

module.exports = PromotionItem;
