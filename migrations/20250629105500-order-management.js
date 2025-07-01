'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Create orders table (depends on multiple tables)
    await queryInterface.createTable('orders', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      order_type: {
        type: Sequelize.ENUM('delivery', 'pickup'),
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM(
          'pending',
          'preparing',
          'ready',
          'out_for_delivery',
          'delivered',
          'cancelled'
        ),
        defaultValue: 'pending',
      },
      subtotal: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      tax: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      delivery_fee: {
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: 0,
      },
      discount_amount: {
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: 0,
      },
      total_amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      estimated_delivery_time: {
        type: Sequelize.DATE,
      },
      order_notes: {
        type: Sequelize.TEXT,
      },
      payment_method: {
        type: Sequelize.ENUM('stripe', 'google_pay', 'apple_pay'),
      },
      payment_status: {
        type: Sequelize.ENUM('pending', 'completed', 'failed', 'refunded'),
        defaultValue: 'pending',
      },
      promotionId: {
        type: Sequelize.UUID,
        references: { 
          model: 'promotions', 
          key: 'id' 
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      promoCodeUsed: {
        type: Sequelize.STRING,
      },
      promotionDiscount: {
        type: Sequelize.DECIMAL(10, 2),
      },
      loyalty_points_earned: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      loyalty_points_redeemed: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
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
      branch_id: {
        type: Sequelize.UUID,
        references: {
          model: 'branches',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      delivery_address_id: {
        type: Sequelize.UUID,
        references: {
          model: 'addresses',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      delivery_person_id: {
        type: Sequelize.UUID,
        references: {
          model: 'delivery_persons',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      deal_id: {
        type: Sequelize.UUID,
        references: {
          model: 'deals',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      pickup_time: { 
        type: Sequelize.DATE 
      },
      delivery_started_at: { 
        type: Sequelize.DATE 
      },
      delivered_at: { 
        type: Sequelize.DATE 
      },
      special_delivery_instructions: { 
        type: Sequelize.TEXT 
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

    // 2. Create order_items table (depends on orders)
    await queryInterface.createTable('order_items', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      unit_price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      item_type: {
        type: Sequelize.ENUM('item', 'deal'),
        defaultValue: 'item',
      },
      special_instructions: {
        type: Sequelize.TEXT,
      },
      order_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'orders',
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
      deal_id: {
        type: Sequelize.UUID,
        references: {
          model: 'deals',
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

    // 3. Create order_item_addons table (depends on order_items)
    await queryInterface.createTable('order_item_addons', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },
      unit_price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      order_item_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'order_items',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      addon_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'item_addons',
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

    // 4. Create order_status_history table (depends on orders)
    await queryInterface.createTable('order_status_history', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      status: {
        type: Sequelize.ENUM(
          'pending',
          'accepted',
          'preparing',
          'ready',
          'out_for_delivery',
          'delivered',
          'cancelled'
        ),
        allowNull: false,
      },
      notes: {
        type: Sequelize.TEXT,
      },
      order_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'orders',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      staff_id: {
        type: Sequelize.UUID,
        references: {
          model: 'staff',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      delivery_person_id: {
        type: Sequelize.UUID,
        references: {
          model: 'delivery_persons',
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

    // 5. Create reviews table (depends on orders and customers)
    await queryInterface.createTable('reviews', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      rating: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      comment: { 
        type: Sequelize.TEXT 
      },
      review_type: {
        type: Sequelize.ENUM('item', 'order', 'delivery'),
        allowNull: false,
      },
      is_verified: { 
        type: Sequelize.BOOLEAN, 
        defaultValue: false 
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
    await queryInterface.addIndex('orders', {
      fields: ['customer_id'],
    });

    await queryInterface.addIndex('orders', {
      fields: ['status'],
    });

    await queryInterface.addIndex('orders', {
      fields: ['created_at'],
    });

    await queryInterface.addIndex('orders', {
      fields: ['branch_id'],
    });

    await queryInterface.addIndex('orders', {
      fields: ['delivery_person_id'],
    });

    await queryInterface.addIndex('order_items', {
      fields: ['order_id'],
    });

    await queryInterface.addIndex('order_items', {
      fields: ['item_id'],
    });

    await queryInterface.addIndex('order_item_addons', {
      fields: ['order_item_id'],
    });

    await queryInterface.addIndex('order_item_addons', {
      fields: ['addon_id'],
    });

    await queryInterface.addIndex('order_status_history', {
      fields: ['order_id'],
    });

    await queryInterface.addIndex('order_status_history', {
      fields: ['status'],
    });

    await queryInterface.addIndex('reviews', {
      fields: ['order_id'],
    });

    await queryInterface.addIndex('reviews', {
      fields: ['customer_id'],
    });

    await queryInterface.addIndex('reviews', {
      fields: ['rating'],
    });

    await queryInterface.addIndex('reviews', {
      fields: ['review_type'],
    });
  },

  async down(queryInterface, Sequelize) {
    // Drop tables in reverse order of creation
    await queryInterface.dropTable('reviews');
    await queryInterface.dropTable('order_status_history');
    await queryInterface.dropTable('order_item_addons');
    await queryInterface.dropTable('order_items');
    await queryInterface.dropTable('orders');
  }
};