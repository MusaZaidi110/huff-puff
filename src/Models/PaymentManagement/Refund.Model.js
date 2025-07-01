const sequelize = require("../../DatabaseConnection");
const { DataTypes } = require("sequelize");

const Refund = sequelize.define(
  "Refund",
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
    reason: {
      type: DataTypes.TEXT,
    },
    status: {
      type: DataTypes.ENUM("pending", "completed", "failed"),
      defaultValue: "pending",
    },
    refund_id: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    tableName: "refunds",
  }
);

Refund.associate = (models) => {
  Refund.belongsTo(models.Payment, { foreignKey: "payment_id" });
};

module.exports = Refund;
