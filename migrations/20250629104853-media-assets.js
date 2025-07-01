'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Create media_assets table first
    await queryInterface.createTable('media_assets', {
      id: {
        type: Sequelize.CHAR(36),
        binary: true,
        primaryKey: true,
        allowNull: false,
      },
      url: {
        type: Sequelize.STRING(2048),
        allowNull: false,
      },
      type: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      filename: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      size: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      uploaded_by: {
        type: Sequelize.UUID,
        allowNull: true,
      },
      context: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      is_temporary: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    // Create social_shares table
    await queryInterface.createTable('social_shares', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      platform: {
        type: Sequelize.ENUM('instagram', 'twitter', 'facebook'),
        allowNull: false,
      },
      platform_post_id: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      poster_handle: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      share_type: {
        type: Sequelize.ENUM('order', 'promotion', 'loyalty_reward'),
        defaultValue: 'order',
      },
      caption: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      share_url: {
        type: Sequelize.STRING(512),
        allowNull: true,
      },
      media_url: {
        type: Sequelize.STRING(512),
        allowNull: true,
      },
      hashtags: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        defaultValue: ['HuffPuffBurger'],
      },
      is_ugc: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      approved_for_feature: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      metadata: {
        type: Sequelize.JSONB,
        defaultValue: {},
      },
      order_id: {
        type: Sequelize.UUID,
        references: {
          model: 'orders',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      customer_id: {
        type: Sequelize.UUID,
        references: {
          model: 'customers',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      promotion_id: {
        type: Sequelize.UUID,
        references: {
          model: 'promotions',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      shared_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    // Add indexes for social_shares
    await queryInterface.addIndex('social_shares', {
      fields: ['platform'],
    });

    await queryInterface.addIndex('social_shares', {
      fields: ['platform_post_id'],
    });

    await queryInterface.addIndex('social_shares', {
      fields: ['poster_handle'],
    });

    await queryInterface.addIndex('social_shares', {
      fields: ['is_ugc'],
    });

    // Add index for media_assets uploaded_by
    await queryInterface.addIndex('media_assets', {
      fields: ['uploaded_by'],
    });

    await queryInterface.addIndex('media_assets', {
      fields: ['is_temporary'],
    });
  },

  async down(queryInterface, Sequelize) {
    // Drop tables in reverse order
    await queryInterface.dropTable('social_shares');
    await queryInterface.dropTable('media_assets');
  }
};