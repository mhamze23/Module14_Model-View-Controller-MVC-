// Import required modules
const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
const dashboardRoutes = require('./dashboard-routes.js');

// Set up API routes
router.use('/api', apiRoutes);

// Set up Home routes
router.use('/', homeRoutes);

// Set up Dashboard routes
router.use('/dashboard', dashboardRoutes);

// Export the configured router
module.exports = router;