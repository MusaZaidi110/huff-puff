const sequelize = require("../../DatabaseConnection");
const { DataTypes } = require("sequelize");

const MediaAsset = sequelize.define(
  "MediaAsset",
  {
    id: {
      type: DataTypes.CHAR(36),
      binary: true,
      primaryKey: true,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING(2048),
      allowNull: false,
      validate: {
        isUrl: true,
      },
    },
    type: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    filename: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    size: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    uploaded_by: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    context: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    is_temporary: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "MediaAsset",
    tableName: "media_assets",
    timestamps: true,
    underscored: true,
  }
);

module.exports = MediaAsset;
