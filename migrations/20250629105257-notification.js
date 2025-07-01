'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Create device_tokens table first
    await queryInterface.createTable('device_tokens', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
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
      device_token: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      device_type: {
        type: Sequelize.ENUM('ios', 'android', 'web'),
        allowNull: false,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
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

    // Create push_notifications table
    await queryInterface.createTable('push_notifications', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.UUID,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      body: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      data: {
        type: Sequelize.JSONB,
      },
      is_read: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      notification_type: {
        type: Sequelize.ENUM('order_update', 'promotion', 'event', 'system'),
        allowNull: false,
      },
      related_id: {
        type: Sequelize.UUID,
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
    await queryInterface.addIndex('device_tokens', {
      fields: ['user_id'],
    });

    await queryInterface.addIndex('device_tokens', {
      fields: ['device_token'],
      unique: true,
    });

    await queryInterface.addIndex('device_tokens', {
      fields: ['device_type'],
    });

    await queryInterface.addIndex('device_tokens', {
      fields: ['is_active'],
    });

    await queryInterface.addIndex('push_notifications', {
      fields: ['user_id'],
    });

    await queryInterface.addIndex('push_notifications', {
      fields: ['is_read'],
    });

    await queryInterface.addIndex('push_notifications', {
      fields: ['notification_type'],
    });

    await queryInterface.addIndex('push_notifications', {
      fields: ['created_at'],
    });
  },

  async down(queryInterface, Sequelize) {
    // Drop tables in reverse order
    await queryInterface.dropTable('push_notifications');
    await queryInterface.dropTable('device_tokens');
  }
};