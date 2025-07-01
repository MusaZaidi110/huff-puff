const sequelize = require("../../DatabaseConnection");
const { DataTypes } = require("sequelize");

const SocialShare = sequelize.define(
  "SocialShare",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    platform: {
      type: DataTypes.ENUM("instagram", "twitter", "facebook"),
      allowNull: false,
    },

    platform_post_id: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "Unique post ID from the platform (e.g., Tweet ID or Instagram post ID)",
    },

    poster_handle: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "Social media handle of the user who made the post",
    },

    share_type: {
      type: DataTypes.ENUM("order", "promotion", "loyalty_reward"),
      defaultValue: "order",
    },

    caption: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    share_url: {
      type: DataTypes.STRING(512),
      validate: { isUrl: true },
      allowNull: true,
    },

    media_url: {
      type: DataTypes.STRING(512),
      allowNull: true,
      comment: "Image or video URL from the platform",
    },

    hashtags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: ["HuffPuffBurger"],
    },

    is_ugc: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    approved_for_feature: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    metadata: {
      type: DataTypes.JSONB,
      defaultValue: {},
    },
  },
  {
    timestamps: true,
    createdAt: "shared_at",
    updatedAt: "updated_at",
    tableName: "social_shares",
    indexes: [
      { fields: ["platform"] },
      { fields: ["platform_post_id"] },
      { fields: ["poster_handle"] },
      { fields: ["is_ugc"] },
    ],
  }
);

// Associations
SocialShare.associate = (models) => {
  SocialShare.belongsTo(models.Order, {
    foreignKey: "order_id",
    as: "order",
    onDelete: "CASCADE",
  });

  SocialShare.belongsTo(models.Customer, {
    foreignKey: "customer_id",
    as: "customer",
  });

  SocialShare.belongsTo(models.Promotion, {
    foreignKey: "promotion_id",
    as: "promotion",
  });
};

module.exports = SocialShare;
