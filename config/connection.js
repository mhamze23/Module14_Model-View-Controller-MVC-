const Sequelize = require('sequelize');
require('dotenv').config();

const { DB_NAME, DB_USER, DB_PW, JAWSDB_URL } = process.env;

const sequelize = JAWSDB_URL
  ? new Sequelize(JAWSDB_URL)
  : new Sequelize(DB_NAME, DB_USER, DB_PW, {
      host: '127.0.0.1',
      dialect: 'mysql',
      port: 3306,
    });

sequelize
  .authenticate()
  .then(() => console.log('Database connected...'))
  .catch((err) => console.error('Unable to connect to the database:', err));

module.exports = sequelize;
