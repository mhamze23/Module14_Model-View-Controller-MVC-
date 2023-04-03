// Import required modules
const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

// Check if the app is running on JAWSDB (usually in production)
// If so, use JAWSDB_URL for the database connection
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  // If not on JAWSDB, connect to the local MySQL database using environment variables
  sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    host: '127.0.0.1',
    dialect: 'mysql',
    port: 3306
  });
}

// Export the sequelize instance for use in other modules
module.exports = sequelize;
