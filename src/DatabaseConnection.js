const { Sequelize } = require("sequelize");
require("dotenv").config(); // Load environment variables

// // Create a new Sequelize instance for PostgreSQL
const sequelize = new Sequelize(
  process.env.PG_DATABASE, // Database name
  process.env.PG_USER, // Username
  process.env.PG_PASSWORD, // Password
  {
    host: process.env.PG_HOST || 'localhost',
    dialect: "postgres",
    port: process.env.PG_PORT || 5432,
    logging: console.log, // Show SQL queries in dev
    dialectOptions: {
      ssl: process.env.NODE_ENV === 'production' ? {
        require: true,
        rejectUnauthorized: false
      } : false
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

// Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to PostgreSQL database with Sequelize!");
  })
  .catch((err) => {
    console.error("Unable to connect to PostgreSQL database:", err);
  });

module.exports = sequelize;



// For Railway Deployment
// const { Sequelize } = require("sequelize");
// require("dotenv").config();

// const sequelize = new Sequelize(
//   process.env.DATABASE_URL, // Railway provides this directly
//   {
//     dialect: "postgres",
//     logging: console.log,
//     dialectOptions: {
//       ssl: {
//         require: true, // Railway requires SSL
//         rejectUnauthorized: false
//       }
//     },
//     pool: {
//       max: 5,
//       min: 0,
//       acquire: 30000,
//       idle: 10000
//     }
//   }
// );

// // Test connection (same as before)
// sequelize.authenticate()
//   .then(() => console.log("Connected to PostgreSQL on Neon!"))
//   .catch(err => console.error("Connection error:", err));

// module.exports = sequelize;