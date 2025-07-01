'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Create branches table first
    await queryInterface.createTable('branches', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      address_line1: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      address_line2: {
        type: Sequelize.STRING,
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      state: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      postal_code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      country: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
      },
      operating_hours: {
        type: Sequelize.JSONB,
      },
      location: {
        type: Sequelize.GEOGRAPHY('POINT', 4326),
        allowNull: false,
      },
      coverage_radius: {
        type: Sequelize.INTEGER,
        defaultValue: 5000,
      },
      delivery_available: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      crowd_status: {
        type: Sequelize.ENUM('quiet', 'busy', 'packed'),
        defaultValue: 'quiet',
        allowNull: false,
      },
      status_updated_at: {
        type: Sequelize.DATE,
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

    // Create branch_deals table (depends on branches and deals tables)
    await queryInterface.createTable('branch_deals', {
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
      branch_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'branches',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
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
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    // Add indexes for branch_deals
    await queryInterface.addIndex('branch_deals', {
      name: 'unique_branch_deal',
      unique: true,
      fields: ['deal_id', 'branch_id'],
    });
    await queryInterface.addIndex('branch_deals', {
      fields: ['is_active'],
    });
    await queryInterface.addIndex('branch_deals', {
      fields: ['branch_id'],
    });
    await queryInterface.addIndex('branch_deals', {
      fields: ['display_order'],
    });

    // Create branch_menu table (depends on branches and items tables)
    await queryInterface.createTable('branch_menu', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      branch_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'branches',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
      is_available: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      special_price: {
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

    // Add composite index for branch_menu
    await queryInterface.addIndex('branch_menu', {
      fields: ['branch_id', 'item_id'],
    });
  },

  async down(queryInterface, Sequelize) {
    // Drop tables in reverse order of creation
    await queryInterface.dropTable('branch_menu');
    await queryInterface.dropTable('branch_deals');
    
    // Remove branch spatial index before dropping branches table
    await queryInterface.removeIndex('branches', 'branch_location_gist');
    await queryInterface.dropTable('branches');
  }
};