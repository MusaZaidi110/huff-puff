const sequelize = require("../../DatabaseConnection");
const { DataTypes } = require("sequelize");

const DeliveryPerson = sequelize.define(
  "DeliveryPerson",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    vehicle_type: {
      type: DataTypes.STRING,
    },
    vehicle_number: {
      type: DataTypes.STRING,
    },
    availability_status: {
      type: DataTypes.ENUM("available", "busy", "offline"),
      defaultValue: "offline",
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
    tableName: "delivery_persons",
  }
);

DeliveryPerson.associate = (models) => {
  DeliveryPerson.belongsTo(models.User, { foreignKey: "user_id" });
  DeliveryPerson.belongsTo(models.Branch, { foreignKey: "branch_id" });
};

module.exports = DeliveryPerson;
