const sequelize = require("../../DatabaseConnection");
const { DataTypes } = require("sequelize");

const Review = sequelize.define(
  "Review",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1, max: 5 },
    },
    comment: { type: DataTypes.TEXT },
    review_type: {
      type: DataTypes.ENUM("item", "order", "delivery"),
      allowNull: false,
    },
    is_verified: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  {
    sequelize,
    modelName: "Review",
    tableName: "reviews",
    timestamps: true, // created_at and updated_at
    underscored: true,
  }
);

Review.associate = (models) => {
  Review.belongsTo(models.Order, { foreignKey: "order_id" });
  Review.belongsTo(models.Customer, { foreignKey: "customer_id" });
};

module.exports = Review;
