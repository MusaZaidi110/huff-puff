const sequelize = require("../../DatabaseConnection");
const { DataTypes } = require("sequelize");

const Payment = sequelize.define(
  "Payment",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    payment_method: {
      type: DataTypes.ENUM("stripe", "google_pay", "apple_pay"),
      allowNull: false,
    },
    payment_intent_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "completed", "failed", "refunded"),
      allowNull: false,
    },
    transaction_id: {
      type: DataTypes.STRING,
    },
    payment_details: {
      type: DataTypes.JSONB,
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    tableName: "payments",
  }
);

Payment.associate = (models) => {
  Payment.belongsTo(models.Order, { foreignKey: "order_id" });
  Payment.hasOne(models.Refund, { foreignKey: "payment_id" });
};

module.exports = Payment;
