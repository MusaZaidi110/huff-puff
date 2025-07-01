const sequelize = require("../../DatabaseConnection");
const { DataTypes } = require("sequelize");

const BranchMenu = sequelize.define(
  "BranchMenu",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    is_available: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    special_price: {
      type: DataTypes.DECIMAL(10, 2),
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    tableName: "branch_menu",
  }
);

BranchMenu.associate = (models) => {
  BranchMenu.belongsTo(models.Branch, { foreignKey: "branch_id" });
  BranchMenu.belongsTo(models.Item, { foreignKey: "item_id" });
};

module.exports = BranchMenu;
