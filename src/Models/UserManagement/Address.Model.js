const sequelize = require("../../DatabaseConnection");
const { DataTypes } = require("sequelize");

const Address = sequelize.define(
  "Address",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
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
    is_default: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    location: {
      type: DataTypes.GEOGRAPHY("POINT", 4326),
      allowNull: false,
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    tableName: "addresses",
  }
);

Address.associate = (models) => {
  Address.belongsTo(models.User, { foreignKey: "user_id" });
};

module.exports = Address;
