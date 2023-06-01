const withAuth = (req, res, next) => {
  // Check if the user is authenticated by looking at the loggedIn property in session object
  if (!req.session.loggedIn) {
    // If the user is not authenticated, redirect them to the login page to authenticate
    res.redirect('/login');
  } else {
    // If the user is authenticated, continue executing the next middleware in the pipeline 
    // or proceed to the route handler to serve the authenticated resources
    next();
  }
};

// Export the withAuth middleware to use in routes that require user authentication
module.exports = withAuth;
