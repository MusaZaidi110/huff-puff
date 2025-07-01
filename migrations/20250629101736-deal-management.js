'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Create deals table first (independent table)
    await queryInterface.createTable('deals', {
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
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      image_url: {
        type: Sequelize.STRING,
      },
      discount_percentage: {
        type: Sequelize.DECIMAL(5, 2),
        defaultValue: 0,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      valid_from: {
        type: Sequelize.DATE,
      },
      valid_to: {
        type: Sequelize.DATE,
      },
      min_selections: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },
      max_selections: {
        type: Sequelize.INTEGER,
      },
      category_id: {
        type: Sequelize.UUID,
        references: {
          model: 'categories',
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

    // Create deal_items table (depends on deals table)
    await queryInterface.createTable('deal_items', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      deal_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'deals',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      item_id: {
        type: Sequelize.UUID,
        references: {
          model: 'items',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      variant_id: {
        type: Sequelize.UUID,
        references: {
          model: 'item_variants',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      addon_id: {
        type: Sequelize.UUID,
        references: {
          model: 'item_addons',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      item_type: {
        type: Sequelize.ENUM('main', 'side', 'drink', 'addon'),
        allowNull: false,
      },
      is_required: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },
      price_override: {
        type: Sequelize.DECIMAL(10, 2),
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

    // Create order_deal_items table (depends on multiple tables)
    await queryInterface.createTable('order_deal_items', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      order_item_id: {
        type: Sequelize.UUID,
        references: {
          model: 'order_items',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      deal_item_id: {
        type: Sequelize.UUID,
        references: {
          model: 'deal_items',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      item_id: {
        type: Sequelize.UUID,
        references: {
          model: 'items',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      variant_id: {
        type: Sequelize.UUID,
        references: {
          model: 'item_variants',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      addon_id: {
        type: Sequelize.UUID,
        references: {
          model: 'item_addons',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },
      unit_price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      special_instructions: {
        type: Sequelize.TEXT,
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
    await queryInterface.addIndex('deals', {
      fields: ['is_active'],
    });

    await queryInterface.addIndex('deals', {
      fields: ['category_id'],
    });

    await queryInterface.addIndex('deal_items', {
      fields: ['deal_id'],
    });

    await queryInterface.addIndex('deal_items', {
      fields: ['item_id'],
    });

    await queryInterface.addIndex('order_deal_items', {
      fields: ['order_item_id'],
    });

    await queryInterface.addIndex('order_deal_items', {
      fields: ['deal_item_id'],
    });
  },

  async down(queryInterface, Sequelize) {
    // Drop tables in reverse order of creation
    await queryInterface.dropTable('order_deal_items');
    await queryInterface.dropTable('deal_items');
    await queryInterface.dropTable('deals');
  }
};