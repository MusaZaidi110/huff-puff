const sequelize = require("../../DatabaseConnection");
const { DataTypes } = require("sequelize");

const HelpCenterSession = sequelize.define(
  "HelpCenterSession",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    status: {
      type: DataTypes.ENUM("active", "resolved", "pending"),
      defaultValue: "pending",
    },
    subject: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    last_message_at: {
      type: DataTypes.DATE,
      comment: "Last activity timestamp",
    },
  },
  {
    timestamps: true,
    tableName: "helpcenter_sessions",
    indexes: [{ fields: ["status"] }, { fields: ["last_message_at"] }],
  }
);

HelpCenterSession.associate = (models) => {
  HelpCenterSession.hasMany(models.HelpCenterMessage, {
    foreignKey: "chat_session_id",
    as: "messages",
  });
  HelpCenterSession.belongsTo(models.User, {
    foreignKey: "customer_id",
    as: "customer",
  });
  HelpCenterSession.belongsTo(models.Staff, {
    foreignKey: "assigned_agent_id",
    as: "assigned_agent",
  });
};

module.exports = HelpCenterSession;
