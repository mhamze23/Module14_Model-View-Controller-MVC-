const { User } = require('../models');
const bcrypt = require('bcrypt');

// Seed user data
const userData = [  
  {
    username: 'johnDoe',  
    email: 'john.doe@example.com',
    password: 'p@ssw0rd123'
  },
  {
    username: 'janeSmith',  
    email: 'jane.smith@example.com',
    password: 's3cur3P@ss!'
  },
  {
    username: 'aliceWonder',  
    email: 'alice.wonder@example.com',
    password: 'aL1c3w0nd3r'
  },
  {
    username: 'bobMarley',  
    email: 'bob.marley@example.com',
    password: 'b0bm@rley'
  },
];

// Seed users into the database
const seedUsers = () => {
  // use bulkCreate to insert multiple entries at once
  // individualHooks: true ensures that beforeCreate hook is run before adding to the database
  return User.bulkCreate(userData, { individualHooks: true });
};

module.exports = seedUsers;
