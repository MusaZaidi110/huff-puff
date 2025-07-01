const sequelize = require("../../DatabaseConnection");
const { DataTypes } = require("sequelize");

const Promotion = sequelize.define(
  "Promotion",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    description: DataTypes.TEXT,
    promoType: {
      type: DataTypes.ENUM(
        "ITEM_DISCOUNT",
        "FREE_DELIVERY"
      ),
      allowNull: false
    },
    discountValue: DataTypes.DECIMAL(10, 2), // Percentage or fixed amount
    startDate: { 
      type: DataTypes.DATE, 
      allowNull: false 
    },
    endDate: { 
      type: DataTypes.DATE, 
      allowNull: false,
      validate: {
        isAfterStartDate(value) {
          if (value <= this.startDate) {
            throw new Error("End date must be after start date");
          }
        }
      }
    },
    isActive: { 
      type: DataTypes.BOOLEAN, 
      defaultValue: true 
    },
    imageUrl: DataTypes.STRING,
    showInSlider: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    showInPopup: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  {
    timestamps: true,
    tableName: "promotions",
    indexes: [
      { fields: ["startDate", "endDate"] },
      { fields: ["isActive"] },
      { fields: ["promoType"] }
    ]
  }
);

// Instance Methods
Promotion.prototype.isValid = function() {
  const now = new Date();
  return this.isActive && now >= this.startDate && now <= this.endDate;
};

// Relationships
Promotion.associate = (models) => {
  Promotion.belongsToMany(models.Item, {
    through: "PromotionItems",
    foreignKey: "promotionId",
    as: "items"
  });
  
  Promotion.hasMany(models.PromotionRedemption, {
    foreignKey: "promotionId"
  });
};

module.exports = Promotion;