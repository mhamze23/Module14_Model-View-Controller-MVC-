// Import required modules
const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');

// Set up API routes
router.use('/api', apiRoutes);

// Set up Home routes
router.use('/', homeRoutes);

// Export the configured router
module.exports = router;