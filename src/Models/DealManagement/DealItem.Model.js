const sequelize = require("../../DatabaseConnection");
const { DataTypes } = require("sequelize");


const DealItem = sequelize.define(
  "DealItem",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    item_type: {
      type: DataTypes.ENUM("main", "side", "drink", "addon"),
      allowNull: false,
    },
    is_required: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    price_override: {
      type: DataTypes.DECIMAL(10, 2),
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    tableName: "deal_items",
  }
);

DealItem.associate = (models) => {
  DealItem.belongsTo(models.Deal, { foreignKey: "deal_id" });
  DealItem.belongsTo(models.Item, { foreignKey: "item_id" });
  DealItem.belongsTo(models.ItemVariant, { foreignKey: "variant_id" });
  DealItem.belongsTo(models.ItemAddon, { foreignKey: "addon_id" });
};


module.exports = DealItem;