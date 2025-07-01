const sequelize = require("../../DatabaseConnection");
const { DataTypes } = require("sequelize");


const Deal = sequelize.define(
  "Deal",
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
    discount_percentage: {
      type: DataTypes.DECIMAL(5, 2),
      defaultValue: 0,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    valid_from: {
      type: DataTypes.DATE,
    },
    valid_to: {
      type: DataTypes.DATE,
    },
    min_selections: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    max_selections: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    tableName: "deals",
  }
);

Deal.associate = (models) => {
  Deal.belongsTo(models.Category, { foreignKey: "category_id" });
  Deal.hasMany(models.DealItem, { foreignKey: "deal_id" });
  Deal.belongsToMany(models.Branch, {
    through: "branch_deals",
    foreignKey: "deal_id",
  });
};


module.exports = Deal;