const sequelize = require("../../DatabaseConnection");
const { DataTypes } = require("sequelize");

const OrderStatusHistory = sequelize.define(
  "OrderStatusHistory",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    status: {
      type: DataTypes.ENUM(
        "pending",
        "accepted",
        "preparing",
        "ready",
        "out_for_delivery",
        "delivered",
        "cancelled"
      ),
      allowNull: false,
    },
    notes: {
      type: DataTypes.TEXT,
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    tableName: "order_status_history",
  }
);

OrderStatusHistory.associate = (models) => {
  OrderStatusHistory.belongsTo(models.Order, { foreignKey: "order_id" });
  OrderStatusHistory.belongsTo(models.Staff, { foreignKey: "staff_id" });
  OrderStatusHistory.belongsTo(models.DeliveryPerson, {
    foreignKey: "delivery_person_id",
  });
};

module.exports = OrderStatusHistory;
