'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Create users table (independent)
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      },
      phone_number: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      role: {
        type: Sequelize.ENUM('customer', 'staff', 'delivery_person', 'admin'),
        defaultValue: 'customer',
        allowNull: false,
      },
      user_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      email_verified_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      profile_image_url: { 
        type: Sequelize.STRING 
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      last_login_at: {
        type: Sequelize.DATE,
      },
      notification_allowed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      promotion_allowed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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

    // 2. Create customers table (depends on users)
    await queryInterface.createTable('customers', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      loyalty_points: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      loyalty_points_purchased: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      loyalty_points_gifted: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      loyalty_points_received: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      referral_code: {
        type: Sequelize.STRING,
        unique: true,
      },
      stripe_customer_id: {
        type: Sequelize.STRING,
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
      referred_by: {
        type: Sequelize.UUID,
        references: {
          model: 'customers',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      preferred_branch_id: {
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

    // 3. Create staff table (depends on users and branches)
    await queryInterface.createTable('staff', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      position: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      permissions: {
        type: Sequelize.JSONB,
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

    // 4. Create delivery_persons table (depends on users and branches)
    await queryInterface.createTable('delivery_persons', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      vehicle_type: {
        type: Sequelize.STRING,
      },
      vehicle_number: {
        type: Sequelize.STRING,
      },
      availability_status: {
        type: Sequelize.ENUM('available', 'busy', 'offline'),
        defaultValue: 'offline',
      },
      location: {
        type: Sequelize.GEOGRAPHY('POINT', 4326),
        allowNull: false,
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

    // 5. Create addresses table (depends on users)
    await queryInterface.createTable('addresses', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
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
      is_default: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      location: {
        type: Sequelize.GEOGRAPHY('POINT', 4326),
        allowNull: false,
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
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    // 6. Create user_otp table (depends on users)
    await queryInterface.createTable('user_otp', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      otp: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      otp_type: {
        type: Sequelize.ENUM('email_verification', 'password_reset'),
        allowNull: false,
        defaultValue: 'email_verification',
      },
      is_used: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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
    await queryInterface.addIndex('users', {
      fields: ['email'],
      unique: true,
      where: { email: { [Sequelize.Op.ne]: null } },
    });

    await queryInterface.addIndex('users', {
      fields: ['phone_number'],
      unique: true,
      where: { phone_number: { [Sequelize.Op.ne]: null } },
    });

    await queryInterface.addIndex('users', {
      fields: ['role'],
    });

    await queryInterface.addIndex('customers', {
      fields: ['user_id'],
      unique: true,
    });

    await queryInterface.addIndex('customers', {
      fields: ['referral_code'],
      unique: true,
    });

    await queryInterface.addIndex('staff', {
      fields: ['user_id'],
      unique: true,
    });

    await queryInterface.addIndex('delivery_persons', {
      fields: ['user_id'],
      unique: true,
    });

    await queryInterface.addIndex('delivery_persons', {
      fields: ['availability_status'],
    });

    await queryInterface.addIndex('addresses', {
      fields: ['user_id'],
    });

    await queryInterface.addIndex('addresses', {
      fields: ['is_default'],
    });

    await queryInterface.addIndex('user_otp', {
      fields: ['user_id'],
    });

    await queryInterface.addIndex('user_otp', {
      fields: ['otp_type'],
    });
  },

  async down(queryInterface, Sequelize) {
    // Drop tables in reverse order of creation
    await queryInterface.removeIndex('addresses', 'address_location_gist');
    await queryInterface.dropTable('user_otp');
    await queryInterface.dropTable('addresses');
    await queryInterface.dropTable('delivery_persons');
    await queryInterface.dropTable('staff');
    await queryInterface.dropTable('customers');
    await queryInterface.dropTable('users');
  }
};