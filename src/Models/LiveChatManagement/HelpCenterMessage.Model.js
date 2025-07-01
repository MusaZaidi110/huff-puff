const sequelize = require("../../DatabaseConnection");
const { DataTypes } = require("sequelize");

const HelpCenterMessage = sequelize.define(
  "HelpCenterMessage",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    sender_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    recipient_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    sender_role: {
      type: DataTypes.ENUM("customer", "admin", "support_agent"),
      allowNull: false,
    },
    is_read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    chat_session_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "helpcenter_sessions",
        key: "id",
      },
    },
    metadata: {
      type: DataTypes.JSONB,
      defaultValue: {},
      comment: "Stores attachments, timestamps, or other metadata",
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    tableName: "helpcenter_messages",
    indexes: [
      { fields: ["chat_session_id"] }, // Faster message retrieval per session
      { fields: ["sender_id"] }, // User's sent messages
      { fields: ["recipient_id"] }, // User's received messages
    ],
  }
);


HelpCenterMessage.associate = (models) => {
  HelpCenterMessage.belongsTo(models.HelpCenterSession, {
    foreignKey: "chat_session_id",
    as: "session",
  });
  HelpCenterMessage.belongsTo(models.User, {
    foreignKey: "sender_id",
    as: "sender",
  });
  HelpCenterMessage.belongsTo(models.User, {
    foreignKey: "recipient_id",
    as: "recipient",
  });
};


module.exports = HelpCenterMessage;
