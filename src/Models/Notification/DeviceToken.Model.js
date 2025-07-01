const sequelize = require("../../DatabaseConnection");
const { DataTypes } = require("sequelize");

const DeviceToken = sequelize.define(
  "DeviceToken",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    device_token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    device_type: {
      type: DataTypes.ENUM("ios", "android", "web"),
      allowNull: false,
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
    tableName: "device_tokens",
  }
);

DeviceToken.associate = (models) => {
  DeviceToken.belongsTo(models.User, { foreignKey: "user_id" });
};

module.exports = DeviceToken;
