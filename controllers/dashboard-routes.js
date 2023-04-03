const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Get all posts for the logged-in user
router.get('/', withAuth, async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      where: {
        user_id: req.session.user_id
      },
      attributes: [
        'id',
        'post_content',
        'title',
        'created_at'
      ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    });

    const posts = dbPostData.map((post) => post.get({ plain: true }));

    res.render('dashboard', { posts, loggedIn: true });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Get a single post for editing
router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const dbPostData = await Post.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
        'post_content',
        'title',
        'created_at'
      ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    });

    if (!dbPostData) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }

    const post = dbPostData.get({ plain: true });

    res.render('edit-post', {
      post,
      loggedIn: true
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Render the new post page
router.get('/newpost', withAuth, (req, res) => {
  res.render('new-post', { loggedIn: true });
});

module.exports = router;
