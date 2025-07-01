const sequelize = require("../../DatabaseConnection");
const { DataTypes } = require("sequelize");

const Item = sequelize.define(
  "Item",
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
    description: {
      type: DataTypes.TEXT,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    image_url: {
      type: DataTypes.STRING,
    },
    is_vegetarian: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    preparation_time: {
      type: DataTypes.INTEGER,
      comment: "Preparation time in minutes",
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
    tableName: "items",
  }
);

Item.associate = (models) => {
  Item.belongsTo(models.Category, { foreignKey: "category_id" });
  Item.hasMany(models.ItemVariant, { foreignKey: "item_id" });
  Item.hasMany(models.ItemAddon, { foreignKey: "item_id" });
  Item.belongsToMany(models.Branch, {
    through: "branch_menu",
    foreignKey: "item_id",
  });
  Item.belongsToMany(models.Promotion, {
    through: "PromotionItems",
    foreignKey: "itemId",
    as: "promotions",
  });
};

module.exports = Item;
