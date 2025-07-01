'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Create payments table (depends on orders)
    await queryInterface.createTable('payments', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      payment_method: {
        type: Sequelize.ENUM('stripe', 'google_pay', 'apple_pay'),
        allowNull: false,
      },
      payment_intent_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('pending', 'completed', 'failed', 'refunded'),
        allowNull: false,
      },
      transaction_id: {
        type: Sequelize.STRING,
      },
      payment_details: {
        type: Sequelize.JSONB,
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
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    // 2. Create refunds table (depends on payments)
    await queryInterface.createTable('refunds', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      reason: {
        type: Sequelize.TEXT,
      },
      status: {
        type: Sequelize.ENUM('pending', 'completed', 'failed'),
        defaultValue: 'pending',
      },
      refund_id: {
        type: Sequelize.STRING,
      },
      payment_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'payments',
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
    await queryInterface.addIndex('payments', {
      fields: ['order_id'],
    });

    await queryInterface.addIndex('payments', {
      fields: ['payment_intent_id'],
      unique: true,
    });

    await queryInterface.addIndex('payments', {
      fields: ['status'],
    });

    await queryInterface.addIndex('payments', {
      fields: ['created_at'],
    });

    await queryInterface.addIndex('refunds', {
      fields: ['payment_id'],
    });

    await queryInterface.addIndex('refunds', {
      fields: ['status'],
    });

    await queryInterface.addIndex('refunds', {
      fields: ['refund_id'],
    });
  },

  async down(queryInterface, Sequelize) {
    // Drop tables in reverse order of creation
    await queryInterface.dropTable('refunds');
    await queryInterface.dropTable('payments');
  }
};