require('dotenv').config();

module.exports = {
  development: {
    username: "postgres",
    password: "admin",
    database: "huffandpuff",
    host: "localhost",
    dialect: "postgres",
    port: 5432
  },
  test: {
    use_env_variable: "DATABASE_URL",
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  },
  production: {
    use_env_variable: "DATABASE_URL",
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
};
