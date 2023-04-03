const express = require('express');
const router = express.Router();
const { Post, User, Comment } = require('../models');

const getPostAttributes = [
    'id',
    'post_content',
    'title',
    'created_at'
];

const includeUserAttributes = [
    {
        model: User,
        attributes: ['username']
    }
];

router.get('/', async (req, res) => {
    try {
        const dbPostData = await Post.findAll({
            attributes: getPostAttributes,
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                    include: includeUserAttributes
                },
                ...includeUserAttributes
            ]
        });

        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('homepage', { posts, loggedIn: req.session.loggedIn });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        return res.redirect('/');
    }

    res.render('login');
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.get('/post/:id', async (req, res) => {
    try {
        const dbPostData = await Post.findOne({
            where: { id: req.params.id },
            attributes: getPostAttributes,
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                    include: includeUserAttributes
                },
                ...includeUserAttributes
            ]
        });

        if (!dbPostData) {
            return res.status(404).json({ message: 'No post found with this id' });
        }

        const post = dbPostData.get({ plain: true });
        res.render('single-post', { post, loggedIn: req.session.loggedIn });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router;
