const sequelize = require("../../DatabaseConnection");
const { DataTypes } = require("sequelize");


const DeliveryTracking = sequelize.define(
  "DeliveryTracking",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    delivery_person_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    location: {
      type: DataTypes.GEOGRAPHY("POINT", 4326),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("picked_up", "in_transit", "nearby", "delivered"),
    },
    estimated_arrival: { type: DataTypes.DATE },
    actual_distance: { type: DataTypes.DECIMAL(8, 2) },
  },
  {
    sequelize,
    modelName: "DeliveryTracking",
    tableName: "delivery_tracking",
    timestamps: true,
    underscored: true,
  }
);

DeliveryTracking.associate = (models) => {
  DeliveryTracking.belongsTo(models.DeliveryPerson, {
    foreignKey: "delivery_person_id",
  });
  DeliveryTracking.belongsTo(models.User, {
    foreignKey: "user_id",
  });
};

module.exports = DeliveryTracking;
