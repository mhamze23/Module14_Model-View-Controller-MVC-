const sequelize = require('../config/connection');
const { User, Post } = require('../models');

// Sample user data
const userdata = [
  {
    username: 'john_doe',
    email: 'john.doe@example.com',
    password: 'p@ssw0rd123'
  },
  {
    username: 'jane_smith',
    email: 'jane.smith@example.com',
    password: 's3cur3P@ss!'
  },
  {
    username: 'alice_wonder',
    email: 'alice.wonder@example.com',
    password: 'aL1c3w0nd3r'
  },
  {
    username: 'bob_marley',
    email: 'bob.marley@example.com',
    password: 'b0bm@rley'
  },
];

// Function to seed users in the database
const seedUsers = () => User.bulkCreate(userdata, { individualHooks: true });

// Export the seedUsers function
module.exports = seedUsers;
