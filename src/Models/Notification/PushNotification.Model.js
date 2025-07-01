const sequelize = require("../../DatabaseConnection");
const { DataTypes } = require("sequelize");

const PushNotification = sequelize.define(
  "PushNotification",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    data: {
      type: DataTypes.JSONB,
    },
    is_read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    notification_type: {
      type: DataTypes.ENUM("order_update", "promotion", "event", "system"),
      allowNull: false,
    },
    related_id: {
      type: DataTypes.UUID,
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    tableName: "push_notifications",
  }
);

PushNotification.associate = (models) => {
  PushNotification.belongsTo(models.User, { foreignKey: "user_id" });
};

module.exports = PushNotification;
