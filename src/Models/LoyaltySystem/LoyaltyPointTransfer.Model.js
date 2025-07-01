const sequelize = require("../../DatabaseConnection");
const { DataTypes } = require("sequelize");

const LoyaltyPointTransfer = sequelize.define(
  "LoyaltyPointTransfer",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    points_transferred: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
    },
    is_accepted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
    tableName: "loyalty_point_transfers",
  }
);

LoyaltyPointTransfer.associate = (models) => {
  LoyaltyPointTransfer.belongsTo(models.Customer, {
    as: "Sender",
    foreignKey: "sender_id",
  });
  LoyaltyPointTransfer.belongsTo(models.Customer, {
    as: "Receiver",
    foreignKey: "receiver_id",
  });
};

module.exports = LoyaltyPointTransfer;
