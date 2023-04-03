// Import required modules
const router = require('express').Router();

// Import route modules
const userRoutes = require('./user-routes');
const postRoutes = require('./post-routes');
const commentRoutes = require('./comment-routes');

// Set up User routes
router.use('/users', userRoutes);

// Set up Post routes
router.use('/posts', postRoutes);

// Set up Comment routes
router.use('/comments', commentRoutes);

// Export the configured router
module.exports = router;
