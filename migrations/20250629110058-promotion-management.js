'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Create banners table (depends on branches)
    await queryInterface.createTable('banners', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
      },
      image_url: {
        type: Sequelize.STRING,
      },
      video_url: {
        type: Sequelize.STRING,
      },
      banners_type: {
        type: Sequelize.ENUM('home_slider', 'category_banners', 'promotional', 'video_background'),
        allowNull: false,
      },
      target_url: {
        type: Sequelize.STRING,
      },
      display_order: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      start_date: {
        type: Sequelize.DATE,
      },
      end_date: {
        type: Sequelize.DATE,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      branch_id: {
        type: Sequelize.UUID,
        references: {
          model: 'branches',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
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

    // 2. Create promotions table (independent)
    await queryInterface.createTable('promotions', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
      },
      promo_type: {
        type: Sequelize.ENUM('ITEM_DISCOUNT', 'FREE_DELIVERY'),
        allowNull: false,
      },
      discount_value: {
        type: Sequelize.DECIMAL(10, 2),
      },
      start_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      end_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      image_url: {
        type: Sequelize.STRING,
      },
      show_in_slider: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      show_in_popup: {
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

    // 3. Create promotion_items join table (depends on promotions and items)
    await queryInterface.createTable('promotion_items', {
      promotion_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        references: {
          model: 'promotions',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      item_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        references: {
          model: 'items',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });

    // 4. Create promotion_redemptions table (depends on promotions and orders)
    await queryInterface.createTable('promotion_redemptions', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      order_id: {
        type: Sequelize.UUID,
        references: {
          model: 'orders',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      discount_amount: {
        type: Sequelize.DECIMAL(10, 2),
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
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    // Add indexes for better performance
    await queryInterface.addIndex('banners', {
      fields: ['branch_id'],
    });

    await queryInterface.addIndex('banners', {
      fields: ['banners_type'],
    });

    await queryInterface.addIndex('banners', {
      fields: ['is_active'],
    });

    await queryInterface.addIndex('banners', {
      fields: ['display_order'],
    });

    await queryInterface.addIndex('banners', {
      fields: ['start_date', 'end_date'],
    });

    await queryInterface.addIndex('promotions', {
      fields: ['start_date', 'end_date'],
    });

    await queryInterface.addIndex('promotions', {
      fields: ['is_active'],
    });

    await queryInterface.addIndex('promotions', {
      fields: ['promo_type'],
    });

    await queryInterface.addIndex('promotion_redemptions', {
      fields: ['order_id'],
    });

    await queryInterface.addIndex('promotion_redemptions', {
      fields: ['promotion_id'],
    });
  },

  async down(queryInterface, Sequelize) {
    // Drop tables in reverse order of creation
    await queryInterface.dropTable('promotion_redemptions');
    await queryInterface.dropTable('promotion_items');
    await queryInterface.dropTable('promotions');
    await queryInterface.dropTable('banners');
  }
};