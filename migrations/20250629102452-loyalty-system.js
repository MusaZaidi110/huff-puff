'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Create loyalty_rewards table (independent)
    await queryInterface.createTable('loyalty_rewards', {
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
      points_required: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      min_purchase_amount: {
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: 0,
      },
      is_purchasable: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      point_to_dhram_ratio: {
        type: Sequelize.INTEGER,
        defaultValue: 100,
      },
      redemption_rules: {
        type: Sequelize.JSONB,
        defaultValue: {
          1000: { discount_type: "percentage", value: 50 },
          500: { discount_type: "fixed", value: 25 },
        },
      },
      reward_type: {
        type: Sequelize.ENUM('discount_percentage', 'discount_fixed', 'free_item'),
        allowNull: false,
      },
      reward_value: {
        type: Sequelize.DECIMAL(10, 2),
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      expires_at: {
        type: Sequelize.DATE,
      },
      free_item_id: {
        type: Sequelize.UUID,
        references: {
          model: 'items',
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

    // 2. Create loyalty_point_transfers table (depends on customers)
    await queryInterface.createTable('loyalty_point_transfers', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      points_transferred: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      message: {
        type: Sequelize.TEXT,
      },
      is_accepted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      sender_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'customers',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      receiver_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'customers',
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

    // 3. Create loyalty_point_purchases table (depends on customers)
    await queryInterface.createTable('loyalty_point_purchases', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      points_purchased: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      amount_paid: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      payment_method: {
        type: Sequelize.ENUM('credit_card', 'wallet', 'bank_transfer'),
        allowNull: false,
      },
      payment_status: {
        type: Sequelize.ENUM('pending', 'completed', 'failed'),
        defaultValue: 'pending',
      },
      transaction_id: {
        type: Sequelize.STRING,
      },
      customer_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'customers',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      payment_id: {
        type: Sequelize.UUID,
        references: {
          model: 'payments',
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

    // 4. Create loyalty_points_transactions table (depends on multiple tables)
    await queryInterface.createTable('loyalty_points_transactions', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      points: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      transaction_type: {
        type: Sequelize.ENUM('earned', 'redeemed', 'referral', 'expired', 'adjusted'),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
      },
      source_type: {
        type: Sequelize.ENUM('order', 'purchase', 'transfer', 'admin_adjustment', 'referral'),
        allowNull: false,
      },
      source_id: {
        type: Sequelize.UUID,
      },
      balance_after: {
        type: Sequelize.INTEGER,
      },
      customer_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'customers',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
      referred_customer_id: {
        type: Sequelize.UUID,
        references: {
          model: 'customers',
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

    // 5. Create customer_rewards table (depends on customers and loyalty_rewards)
    await queryInterface.createTable('customer_rewards', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      is_used: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      used_at: {
        type: Sequelize.DATE,
      },
      expires_at: {
        type: Sequelize.DATE,
      },
      customer_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'customers',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      reward_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'loyalty_rewards',
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
    await queryInterface.addIndex('loyalty_rewards', {
      fields: ['is_active'],
    });

    await queryInterface.addIndex('loyalty_rewards', {
      fields: ['points_required'],
    });

    await queryInterface.addIndex('loyalty_point_transfers', {
      fields: ['sender_id'],
    });

    await queryInterface.addIndex('loyalty_point_transfers', {
      fields: ['receiver_id'],
    });

    await queryInterface.addIndex('loyalty_point_transfers', {
      fields: ['is_accepted'],
    });

    await queryInterface.addIndex('loyalty_point_purchases', {
      fields: ['customer_id'],
    });

    await queryInterface.addIndex('loyalty_point_purchases', {
      fields: ['payment_status'],
    });

    await queryInterface.addIndex('loyalty_points_transactions', {
      fields: ['customer_id'],
    });

    await queryInterface.addIndex('loyalty_points_transactions', {
      fields: ['transaction_type'],
    });

    await queryInterface.addIndex('loyalty_points_transactions', {
      fields: ['source_type', 'source_id'],
    });

    await queryInterface.addIndex('customer_rewards', {
      fields: ['customer_id'],
    });

    await queryInterface.addIndex('customer_rewards', {
      fields: ['reward_id'],
    });

    await queryInterface.addIndex('customer_rewards', {
      fields: ['is_used'],
    });
  },

  async down(queryInterface, Sequelize) {
    // Drop tables in reverse order of creation
    await queryInterface.dropTable('customer_rewards');
    await queryInterface.dropTable('loyalty_points_transactions');
    await queryInterface.dropTable('loyalty_point_purchases');
    await queryInterface.dropTable('loyalty_point_transfers');
    await queryInterface.dropTable('loyalty_rewards');
  }
};