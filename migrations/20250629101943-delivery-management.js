'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Create delivery_zone table first
    await queryInterface.createTable('delivery_zone', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      polygon_coordinates: {
        type: Sequelize.JSONB,
      },
      base_delivery_fee: {
        type: Sequelize.DECIMAL(8, 2),
      },
      per_km_rate: {
        type: Sequelize.DECIMAL(8, 2),
      },
      minimum_order_amount: {
        type: Sequelize.DECIMAL(10, 2),
      },
      estimated_delivery_time: {
        type: Sequelize.INTEGER,
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

    // Create delivery_tracking table
    await queryInterface.createTable('delivery_tracking', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      delivery_person_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'delivery_persons',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      location: {
        type: Sequelize.GEOGRAPHY('POINT', 4326),
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('picked_up', 'in_transit', 'nearby', 'delivered'),
      },
      estimated_arrival: {
        type: Sequelize.DATE,
      },
      actual_distance: {
        type: Sequelize.DECIMAL(8, 2),
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
    await queryInterface.addIndex('delivery_zone', {
      fields: ['branch_id'],
    });

    await queryInterface.addIndex('delivery_tracking', {
      fields: ['delivery_person_id'],
    });

    await queryInterface.addIndex('delivery_tracking', {
      fields: ['user_id'],
    });

    await queryInterface.addIndex('delivery_tracking', {
      fields: ['status'],
    });
  },

  async down(queryInterface, Sequelize) {
    // Drop tables in reverse order
    await queryInterface.removeIndex('delivery_tracking', 'delivery_tracking_location_gist');
    await queryInterface.dropTable('delivery_tracking');
    await queryInterface.dropTable('delivery_zone');
  }
};