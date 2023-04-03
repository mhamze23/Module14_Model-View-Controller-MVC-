// Import seed data and sequelize connection
const seedUsers = require('./user-seeds');
const seedPosts = require('./post-seeds');
const seedComments = require('./comment-seeds');
const sequelize = require('../config/connection');

const seedAll = async () => {
    // Synchronize the database and force a reset
    await sequelize.sync({ force: true });

    // Seed user data
    await seedUsers();

    // Seed post data
    await seedPosts();

    // Seed comment data
    await seedComments();

    // Exit the process
    process.exit(0);
};

// Call the seedAll function
seedAll();
