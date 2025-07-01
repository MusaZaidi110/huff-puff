const sequelize = require("../../DatabaseConnection");
const { DataTypes } = require("sequelize");

const EmailCampaign = sequelize.define(
  "EmailCampaign",
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
    user_list_id: {
      type: DataTypes.UUID,
      allowNull: false,
      comment: "FK to user_lists.id",
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    user_list_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "email_user_lists",
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    tableName: "email_campaigns",
  }
);

module.exports = EmailCampaign;
