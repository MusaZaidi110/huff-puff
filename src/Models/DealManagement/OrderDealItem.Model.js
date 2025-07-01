const sequelize = require("../../DatabaseConnection");
const { DataTypes } = require("sequelize");

const OrderDealItem = sequelize.define(
  "OrderDealItem",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    deal_item_id: {
      type: DataTypes.UUID,
      references: {
        model: "deal_items",
        key: "id",
      },
    },
    item_id: {
      type: DataTypes.UUID,
      references: {
        model: "items",
        key: "id",
      },
    },
    variant_id: {
      type: DataTypes.UUID,
      references: {
        model: "item_variants",
        key: "id",
      },
    },
    addon_id: {
      type: DataTypes.UUID,
      references: {
        model: "item_addons",
        key: "id",
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    unit_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    special_instructions: {
      type: DataTypes.TEXT,
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    tableName: "order_deal_items",
  }
);

OrderDealItem.associate = (models) => {
  OrderDealItem.belongsTo(models.OrderItem, { foreignKey: "order_item_id" });
  OrderDealItem.belongsTo(models.DealItem, { foreignKey: "deal_item_id" });
  OrderDealItem.belongsTo(models.Item, { foreignKey: "item_id" });
  OrderDealItem.belongsTo(models.ItemVariant, { foreignKey: "variant_id" });
  OrderDealItem.belongsTo(models.ItemAddon, { foreignKey: "addon_id" });
};

module.exports = OrderDealItem;
