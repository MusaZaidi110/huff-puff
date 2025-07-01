const sequelize = require("../../DatabaseConnection");
const { DataTypes } = require("sequelize");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    phone_number: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    role: {
      type: DataTypes.ENUM("customer", "staff", "delivery_person", "admin"),
      defaultValue: "customer",
      allowNull: false,
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email_verified_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    profile_image_url: { type: DataTypes.STRING },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    last_login_at: {
      type: DataTypes.DATE,
    },
    notification_allowed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    promotion_allowed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    tableName: "users",
  }
);

User.associate = (models) => {
  User.hasOne(models.Customer, {
    foreignKey: "user_id",
    as: "customer_profile",
    onDelete: "CASCADE",
  });

  User.hasOne(models.Staff, {
    foreignKey: "user_id",
    as: "staff_profile",
    onDelete: "CASCADE",
  });

  User.hasOne(models.DeliveryPerson, {
    foreignKey: "user_id",
    as: "delivery_profile",
    onDelete: "CASCADE",
  });
};

module.exports = User;
