const sequelize = require("../../DatabaseConnection");
const { DataTypes } = require("sequelize");

const EmailUserList = sequelize.define(
  "EmailUserList",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    users_email: {
      type: DataTypes.JSONB,
      allowNull: false,
      comment: "Array of user emails or IDs (preferably emails)",
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    tableName: "email_user_lists",
  }
);

module.exports = EmailUserList;
