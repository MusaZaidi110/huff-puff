const sequelize = require("../../DatabaseConnection");
const { DataTypes } = require("sequelize");

const OTP = sequelize.define(
  "OTP",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    otp: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    otp_type: {
      type: DataTypes.ENUM("email_verification", "password_reset"),
      allowNull: false,
      defaultValue: "email_verification",
    },
    is_used: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false, // should be NOT NULL because each OTP belongs to a user
      references: {
        model: "users",  // Name of the target table (must match your Users table name)
        key: "id",
      },
      onDelete: "CASCADE", // optional, depending on your delete strategy
      onUpdate: "CASCADE",
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    tableName: "user_otp",
  }
);

OTP.associate = (models) => {
  OTP.belongsTo(models.User, { foreignKey: "user_id" });
};

module.exports = OTP;
