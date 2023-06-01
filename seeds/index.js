const sequelize = require('../config/connection');

// importing seed files
const seedUsers = require('./user-seeds');
const seedPosts = require('./post-seeds');      
const seedComments = require('./comment-seeds');

// function to seed all data
const seedAll = async () => {
  
  // syncing sequelize models to the database
  console.log('\n----- SYNCING DATABASE -----\n');
  await sequelize.sync({ force: true });

  // seeding user data
  console.log('\n----- SEEDING USERS -----\n');
  await seedUsers();

  // seeding post data
  console.log('\n----- SEEDING POSTS -----\n');
  await seedPosts();

  // seeding comment data
  console.log('\n----- SEEDING COMMENTS -----\n');
  await seedComments();

  // safely exiting process after seeding
  console.log('\n----- SEEDING COMPLETE -----\n');
  process.exit(0);
};

// calling seedAll function
seedAll();
