const sequelize = require("../../DatabaseConnection");
const { DataTypes } = require("sequelize");

const Branch = sequelize.define(
  "Branch",
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
    address_line1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address_line2: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postal_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
    },
    operating_hours: {
      type: DataTypes.JSONB,
    },
    location: {
      type: DataTypes.GEOGRAPHY("POINT", 4326),
      allowNull: false,
      comment: "Stores latitude/longitude in WGS84",
    },
    coverage_radius: {
      type: DataTypes.INTEGER, // in meters
      defaultValue: 5000,
      comment: "Default delivery radius",
    },
    delivery_available: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    crowd_status: {
      type: DataTypes.ENUM("quiet", "busy", "packed"),
      defaultValue: "quiet",
      allowNull: false,
    },
    status_updated_at: {
      type: DataTypes.DATE,
      allowNull: true, // Starts empty
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    tableName: "branches",
  }
);

module.exports = Branch;
