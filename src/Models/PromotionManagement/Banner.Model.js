const sequelize = require("../../DatabaseConnection");
const { DataTypes } = require("sequelize");

const banners = sequelize.define(
  "banners",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    image_url: { type: DataTypes.STRING },
    video_url: { type: DataTypes.STRING },
    banners_type: {
      type: DataTypes.ENUM(
        "home_slider",
        "category_banners",
        "promotional",
        "video_background"
      ),
      allowNull: false,
    },
    target_url: { type: DataTypes.STRING },
    display_order: { type: DataTypes.INTEGER, defaultValue: 0 },
    start_date: { type: DataTypes.DATE },
    end_date: { type: DataTypes.DATE },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
    branch_id: { type: DataTypes.UUID }, // For branch-specific banners
  },
  {
    sequelize,
    modelName: "banners",
    tableName: "banners",
    timestamps: true, // created_at and updated_at
    underscored: true,
  }
);

banners.associate = (models) => {
  banners.belongsTo(models.Branch, { foreignKey: "branch_id" });
};

module.exports = banners;
