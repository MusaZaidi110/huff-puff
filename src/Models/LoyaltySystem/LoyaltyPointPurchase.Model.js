const sequelize = require("../../DatabaseConnection");
const { DataTypes } = require("sequelize");

const LoyaltyPointPurchase = sequelize.define(
  "LoyaltyPointPurchase",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    points_purchased: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount_paid: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    payment_method: {
      type: DataTypes.ENUM("credit_card", "wallet", "bank_transfer"),
      allowNull: false,
    },
    payment_status: {
      type: DataTypes.ENUM("pending", "completed", "failed"),
      defaultValue: "pending",
    },
    transaction_id: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
    tableName: "loyalty_point_purchases",
  }
);

LoyaltyPointPurchase.associate = (models) => {
  LoyaltyPointPurchase.belongsTo(models.Customer, {
    foreignKey: "customer_id",
  });
  LoyaltyPointPurchase.belongsTo(models.Payment, { foreignKey: "payment_id" });
};

module.exports = LoyaltyPointPurchase;
