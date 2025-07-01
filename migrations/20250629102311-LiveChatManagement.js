'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Create helpcenter_sessions table first (independent table)
    await queryInterface.createTable('helpcenter_sessions', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      status: {
        type: Sequelize.ENUM('active', 'resolved', 'pending'),
        defaultValue: 'pending',
      },
      subject: {
        type: Sequelize.STRING(100),
      },
      last_message_at: {
        type: Sequelize.DATE,
      },
      customer_id: {
        type: Sequelize.UUID,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      assigned_agent_id: {
        type: Sequelize.UUID,
        references: {
          model: 'staff',
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

    // Create helpcenter_messages table (depends on helpcenter_sessions)
    await queryInterface.createTable('helpcenter_messages', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      sender_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      recipient_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      message: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      sender_role: {
        type: Sequelize.ENUM('customer', 'admin', 'support_agent'),
        allowNull: false,
      },
      is_read: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      chat_session_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'helpcenter_sessions',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      metadata: {
        type: Sequelize.JSONB,
        defaultValue: {},
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

    // Add indexes for helpcenter_sessions
    await queryInterface.addIndex('helpcenter_sessions', {
      fields: ['status'],
    });

    await queryInterface.addIndex('helpcenter_sessions', {
      fields: ['last_message_at'],
    });

    await queryInterface.addIndex('helpcenter_sessions', {
      fields: ['customer_id'],
    });

    await queryInterface.addIndex('helpcenter_sessions', {
      fields: ['assigned_agent_id'],
    });

    // Add indexes for helpcenter_messages
    await queryInterface.addIndex('helpcenter_messages', {
      fields: ['chat_session_id'],
    });

    await queryInterface.addIndex('helpcenter_messages', {
      fields: ['sender_id'],
    });

    await queryInterface.addIndex('helpcenter_messages', {
      fields: ['recipient_id'],
    });

    await queryInterface.addIndex('helpcenter_messages', {
      fields: ['is_read'],
    });

    await queryInterface.addIndex('helpcenter_messages', {
      fields: ['created_at'],
    });
  },

  async down(queryInterface, Sequelize) {
    // Drop tables in reverse order of creation
    await queryInterface.dropTable('helpcenter_messages');
    await queryInterface.dropTable('helpcenter_sessions');
  }
};