// Import required modules
const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Route to get all posts
router.get('/', async (req, res) => {
    try {
        const dbPostData = await Post.findAll({
            attributes: ['id', 'post_content', 'title', 'created_at'],
            order: [['created_at', 'DESC']],
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                }
            ]
        });
        res.json(dbPostData);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// Route to get a single post
router.get('/:id', async (req, res) => {
    try {
        const dbPostData = await Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: ['id', 'post_content', 'title', 'created_at'],
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                }
            ]
        });

        if (!dbPostData) {
            return res.status(404).json({ message: 'No post found with this id' });
        }

        res.json(dbPostData);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// Route to create a new post with authentication middleware
router.post('/', withAuth, async (req, res) => {
    try {
        const dbPostData = await Post.create({
            title: req.body.title,
            post_content: req.body.post_content,
            user_id: req.session.user_id
        });
        res.json(dbPostData);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// Route to update a post title or content with authentication middleware
router.put('/:id', withAuth, async (req, res) => {
    try {
        const dbPostData = await Post.update(req.body, {
            // Pass in req.body instead to only update what's passed through
            individualHooks: true,
            where: {
                id: req.params.id
            }
        });

        if (!dbPostData) {
            return res.status(404).json({ message: 'No post found with this id' });
        }

        res.json(dbPostData);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// Route to delete a post with authentication middleware
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const dbPostData = await Post.destroy({
            where: {
                id: req.params.id
            }
        });

        if (!dbPostData) {
            return res.status(404).json({ message: 'No post found with this id' });
        }

        res.json(dbPostData);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// Export the configured
