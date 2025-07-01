const sequelize = require("../../DatabaseConnection");
const { DataTypes } = require("sequelize");

const Order = sequelize.define(
  "Order",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    order_type: {
      type: DataTypes.ENUM("delivery", "pickup"),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(
        "pending",
        "preparing",
        "ready",
        "out_for_delivery",
        "delivered",
        "cancelled"
      ),
      defaultValue: "pending",
    },
    subtotal: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    tax: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    delivery_fee: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    discount_amount: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    total_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    estimated_delivery_time: {
      type: DataTypes.DATE,
    },
    order_notes: {
      type: DataTypes.TEXT,
    },
    payment_method: {
      type: DataTypes.ENUM("stripe", "google_pay", "apple_pay"),
    },
    payment_status: {
      type: DataTypes.ENUM("pending", "completed", "failed", "refunded"),
      defaultValue: "pending",
    },
    promotionId: {
      type: DataTypes.UUID,
      references: { model: "Promotions", key: "id" },
    },
    promoCodeUsed: DataTypes.STRING,
    promotionDiscount: DataTypes.DECIMAL(10, 2),
    loyalty_points_earned: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    loyalty_points_redeemed: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    customer_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "customers",
        key: "id",
      },
    },
    deal_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "deals",
        key: "id",
      },
    },
    pickup_time: { type: DataTypes.DATE },
    delivery_started_at: { type: DataTypes.DATE },
    delivered_at: { type: DataTypes.DATE },
    special_delivery_instructions: { type: DataTypes.TEXT },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    tableName: "orders",
  }
);

Order.associate = (models) => {
  Order.belongsTo(models.Customer, { foreignKey: "customer_id" });
  Order.belongsTo(models.Branch, { foreignKey: "branch_id" });
  Order.belongsTo(models.Address, {
    as: "DeliveryAddress",
    foreignKey: "delivery_address_id",
  });
  Order.belongsTo(models.DeliveryPerson, { foreignKey: "delivery_person_id" });
  Order.hasMany(models.OrderItem, { foreignKey: "order_id" });
  Order.hasMany(models.OrderStatusHistory, { foreignKey: "order_id" });
  Order.hasOne(models.Payment, { foreignKey: "order_id" });
  Order.belongsTo(models.Promotion, { foreignKey: "promotionId" });
  Order.hasMany(models.PromotionRedemption, { foreignKey: "orderId" });
  Order.belongsTo(models.Deal, {
    foreignKey: "deal_id",
    as: "applied_deal",
    onDelete: "SET NULL", // Don't cascade delete if deal is removed
  });
};

module.exports = Order;
