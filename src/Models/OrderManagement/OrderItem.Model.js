const sequelize = require("../../DatabaseConnection");
const { DataTypes } = require("sequelize");

const OrderItem = sequelize.define(
  "OrderItem",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    unit_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    item_type: {
      type: DataTypes.ENUM("item", "deal"),
      defaultValue: "item",
    },
    deal_id: {
      type: DataTypes.UUID,
      references: {
        model: "deals",
        key: "id",
      },
    },
    special_instructions: {
      type: DataTypes.TEXT,
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    tableName: "order_items",
  }
);

OrderItem.associate = (models) => {
  OrderItem.belongsTo(models.Order, { foreignKey: "order_id" });
  OrderItem.belongsTo(models.Item, { foreignKey: "item_id" });
  OrderItem.belongsTo(models.ItemVariant, { foreignKey: "variant_id" });
  OrderItem.hasMany(models.OrderItemAddon, { foreignKey: "order_item_id" });
  OrderItem.belongsTo(models.Deal, { foreignKey: "deal_id" });
};

module.exports = OrderItem;
