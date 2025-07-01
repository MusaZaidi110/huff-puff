'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Create categories table (independent)
    await queryInterface.createTable('categories', {
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
      image_url: {
        type: Sequelize.STRING,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      display_order: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
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

    // 2. Create items table (depends on categories)
    await queryInterface.createTable('items', {
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
      is_vegetarian: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      preparation_time: {
        type: Sequelize.INTEGER,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
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

    // 3. Create item_variants table (depends on items)
    await queryInterface.createTable('item_variants', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      price_adjustment: {
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: 0,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      item_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'items',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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

    // 4. Create item_addons table (depends on items)
    await queryInterface.createTable('item_addons', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: 0,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      item_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'items',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
    await queryInterface.addIndex('categories', {
      fields: ['is_active'],
    });

    await queryInterface.addIndex('categories', {
      fields: ['display_order'],
    });

    await queryInterface.addIndex('items', {
      fields: ['category_id'],
    });

    await queryInterface.addIndex('items', {
      fields: ['is_active'],
    });

    await queryInterface.addIndex('items', {
      fields: ['is_vegetarian'],
    });

    await queryInterface.addIndex('item_variants', {
      fields: ['item_id'],
    });

    await queryInterface.addIndex('item_variants', {
      fields: ['is_active'],
    });

    await queryInterface.addIndex('item_addons', {
      fields: ['item_id'],
    });

    await queryInterface.addIndex('item_addons', {
      fields: ['is_active'],
    });

    // Note: The branch_menu and PromotionItems join tables will be created automatically by Sequelize
    // when the belongsToMany associations are set up in the models
  },

  async down(queryInterface, Sequelize) {
    // Drop tables in reverse order of creation
    await queryInterface.dropTable('item_addons');
    await queryInterface.dropTable('item_variants');
    await queryInterface.dropTable('items');
    await queryInterface.dropTable('categories');
  }
};