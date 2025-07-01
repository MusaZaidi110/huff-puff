'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Create email_user_lists table first (independent table)
    await queryInterface.createTable('email_user_lists', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: Sequelize.TEXT,
      },
      users_email: {
        type: Sequelize.JSONB,
        allowNull: false,
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

    // Create email_campaigns table (depends on email_user_lists)
    await queryInterface.createTable('email_campaigns', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      user_list_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'email_user_lists',
          key: 'id',
        },
        onDelete: 'CASCADE',
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

    // Add indexes for better performance
    await queryInterface.addIndex('email_user_lists', {
      fields: ['name'],
      unique: true,
    });

    await queryInterface.addIndex('email_campaigns', {
      fields: ['user_list_id'],
    });

    await queryInterface.addIndex('email_campaigns', {
      fields: ['is_active'],
    });
  },

  async down(queryInterface, Sequelize) {
    // Drop tables in reverse order of creation
    await queryInterface.dropTable('email_campaigns');
    await queryInterface.dropTable('email_user_lists');
  }
};