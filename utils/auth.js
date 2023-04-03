// Middleware to protect routes that require authentication
const withAuth = (req, res, next) => {
    // If the user is not authenticated, redirect to the login page
    if (!req.session.user_id) {
      res.redirect('/login');
    } else {
      // If the user is authenticated, proceed to the next middleware or route
      next();
    }
  };
  
  // Export the withAuth middleware
  module.exports = withAuth;
  