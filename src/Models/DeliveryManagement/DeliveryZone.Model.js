const sequelize = require("../../DatabaseConnection");
const { DataTypes } = require("sequelize");

const DeliveryZone = sequelize.define(
  "DeliveryZone",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    polygon_coordinates: { type: DataTypes.JSONB }, // GeoJSON polygon
    base_delivery_fee: { type: DataTypes.DECIMAL(8, 2) },
    per_km_rate: { type: DataTypes.DECIMAL(8, 2) },
    minimum_order_amount: { type: DataTypes.DECIMAL(10, 2) },
    estimated_delivery_time: { type: DataTypes.INTEGER }, // minutes
  },
  {
    sequelize,
    modelName: "DeliveryZone",
    tableName: "delivery_zone",
    timestamps: true, // created_at and updated_at
    underscored: true,
  }
);

DeliveryZone.associate = (models) => {
  DeliveryZone.belongsTo(models.Branch, { foreignKey: "branch_id" });
};

module.exports = DeliveryZone;
