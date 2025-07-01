const sequelize = require("../../DatabaseConnection");
const { DataTypes } = require("sequelize");

const Staff = sequelize.define(
  "Staff",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    permissions: {
      type: DataTypes.JSONB,
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    tableName: "staff",
  }
);

Staff.associate = (models) => {
  Staff.belongsTo(models.User, { foreignKey: "user_id" });
  Staff.belongsTo(models.Branch, { foreignKey: "branch_id" });
};

module.exports = Staff;
