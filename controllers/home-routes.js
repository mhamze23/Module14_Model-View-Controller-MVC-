const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth')

// Route for fetching all posts
router.get('/', async (req, res) => {
  try {
    // Fetch posts data from the database
    const dbPostData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    // Convert posts data into a plain JavaScript object 
    const posts = dbPostData.map((post) => post.get({ plain: true }));

    // Render homepage with fetched posts data and logged-in status
    res.render('homepage', { posts, logged_in: req.session.logged_in });
  } catch (err) {
    // Handle error and send response
    res.status(500).json(err);
  }
});

// Route for fetching a post by its id
router.get('/posts/:id', async (req, res) => {
  try {
    // Fetch post data by id from the database
    const dbPostData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          include: [User]
        },
      ],
    });

    if (!dbPostData) {
      // Return error message if no post was found with the given id
      res.status(404).json({ message: 'No post found with the specified ID.' });
      return;
    }

    // Convert post data into a plain JavaScript object 
    const post = dbPostData.get({ plain: true });

    // Render the 'post' view with the fetched post data and logged-in status
    res.render('post', { ...post, logged_in: req.session.logged_in });

  } catch (err) {
    // Handle error and send response
    res.status(500).json(err);
  }
});

// Route for fetching all posts from the logged-in user's dashboard
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Fetch user's data from the database excluding password
    const dbUserData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    // Convert user data into a plain JavaScript object 
    const dashboard = dbUserData.get({ plain: true });

    // Render the 'dashboard' view with the fetched user data and logged-in status
    res.render('dashboard', { ...dashboard, logged_in: req.session.logged_in });

  } catch (err) {
    // Handle error and send response
    res.status(500).json(err);
  }
});

// Route for fetching a post for editing
router.get('/edit/:id', async (req, res) => {
  try {
    // Fetch post data by id from the database
    const dbPostData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    if (!dbPostData) {
      // Return error message if no post was found with the given id
      res.status(404).json({ message: 'No post found with the specified ID.' });
      return;
    }

    // Convert post data into a plain JavaScript object
    const edit = dbPostData.get({ plain: true });

    // Render the 'edit' view with the fetched post data and logged-in status
    res.render('edit', { ...edit, logged_in: req.session.logged_in });

  } catch (err) {
    // Handle error and send response
    res.status(500).json(err);
  }
});

// Route for login
router.get('/login', (req, res) => {
  // If user is already logged in, redirect to the dashboard
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  // Render the 'login' view
  res.render('login');
});

// Route for sign up
router.get('/signup', (req, res) => {
  // If user is already logged in, redirect to the dashboard
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  // Render the 'signup' view
  res.render('signup');
});

module.exports = router;
