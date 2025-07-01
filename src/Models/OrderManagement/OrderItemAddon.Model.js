const sequelize = require("../../DatabaseConnection");
const { DataTypes } = require("sequelize");

const OrderItemAddon = sequelize.define(
  "OrderItemAddon",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    unit_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    tableName: "order_item_addons",
  }
);

OrderItemAddon.associate = (models) => {
  OrderItemAddon.belongsTo(models.OrderItem, { foreignKey: "order_item_id" });
  OrderItemAddon.belongsTo(models.ItemAddon, { foreignKey: "addon_id" });
};

module.exports = OrderItemAddon;
