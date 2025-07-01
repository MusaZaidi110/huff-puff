const sequelize = require("../../DatabaseConnection");
const { DataTypes } = require("sequelize");

const LoyaltyPointsTransaction = sequelize.define(
  "LoyaltyPointsTransaction",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    points: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    transaction_type: {
      type: DataTypes.ENUM(
        "earned",
        "redeemed",
        "referral",
        "expired",
        "adjusted"
      ),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    source_type: {
      type: DataTypes.ENUM(
        "order",
        "purchase",
        "transfer",
        "admin_adjustment",
        "referral"
      ),
      allowNull: false,
    },
    source_id: {
      type: DataTypes.UUID,
      comment: "ID of the related entity (order, purchase, etc)",
    },
    balance_after: {
      type: DataTypes.INTEGER,
      comment: "Customer's balance after this transaction",
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    tableName: "loyalty_points_transactions",
  }
);

LoyaltyPointsTransaction.associate = (models) => {
  LoyaltyPointsTransaction.belongsTo(models.Customer, {
    foreignKey: "customer_id",
  });
  LoyaltyPointsTransaction.belongsTo(models.Order, { foreignKey: "order_id" });
  LoyaltyPointsTransaction.belongsTo(models.Customer, {
    as: "ReferredCustomer",
    foreignKey: "referred_customer_id",
  });
  LoyaltyPointsTransaction.belongsTo(models.LoyaltyPointPurchase, {
    foreignKey: "source_id",
    constraints: false,
  });
  LoyaltyPointsTransaction.belongsTo(models.LoyaltyPointTransfer, {
    foreignKey: "source_id",
    constraints: false,
  });
};

module.exports = LoyaltyPointsTransaction;
