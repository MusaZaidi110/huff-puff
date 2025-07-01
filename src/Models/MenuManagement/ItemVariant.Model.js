const sequelize = require("../../DatabaseConnection");
const { DataTypes } = require("sequelize");

const ItemVariant = sequelize.define(
  "ItemVariant",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price_adjustment: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    tableName: "item_variants",
  }
);

ItemVariant.associate = (models) => {
  ItemVariant.belongsTo(models.Item, { foreignKey: "item_id" });
};

module.exports = ItemVariant;
