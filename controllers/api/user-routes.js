const router = require('express').Router();
const { User, Post, Comment } = require("../../models");

// Route to get all users
router.get('/', async (req, res) => {
    try {
        const dbUserData = await User.findAll({
            attributes: { exclude: ['password'] }
        });
        res.json(dbUserData);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// Route to get a user by id
router.get('/:id', async (req, res) => {
    try {
        const dbUserData = await User.findOne({
            attributes: { exclude: ['password'] },
            where: {
                id: req.params.id
            },
            include: [
                {
                    model: Post,
                    attributes: ['id', 'title', 'post_content', 'created_at']
                },
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'created_at'],
                    include: {
                        model: Post,
                        attributes: ['title']
                    }
                }
            ]
        });

        if (!dbUserData) {
            return res.status(404).json({ message: 'No user found with this id' });
        }

        res.json(dbUserData);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// Route to sign up a new user
router.post('/signup', async (req, res) => {
    try {
        const dbUserData = await User.create({
            username: req.body.username,
            password: req.body.password
        });

        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;

            res.json(dbUserData);
        });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// Route to log in a user
router.post('/login', async (req, res) => {
    try {
        const dbUserData = await User.findOne({
            where: {
                username: req.body.username
            }
        });

        if (!dbUserData) {
            return res.status(400).json({ message: 'No user with that username!' });
        }

        // Verify user's password
        const validPassword = dbUserData.checkPassword(req.body.password);

        if (!validPassword) {
            return res.status(400).json({ message: 'Incorrect password!' });
        }

        // Create a session for the user if username and password are valid
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;

            res.redirect('/');

            return res.json({ user: dbUserData, message: 'You are now logged in!' });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// Route to log out a user
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    }
    else {
        res.status(404).end();
    }
});

// Route to update user details
router.put('/:id', async (req, res) => {
    try {
        const dbUserData = await User.update(req.body, {
            // Pass in req.body instead to only update what's passed through
            individualHooks: true,
            where: {
                id: req.params.id
            }
        });

        if (!dbUserData) {
            return res.status(404).json({ message: 'No user found with this id' });
        }

        res.json(dbUserData);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// Route to delete a user by id
router.delete('/:id', async (req, res) => {
    try {
        const dbUserData = await User.destroy({
            where: {
                id: req.params.id
            }
        });
        if (!dbUserData) {
            return res.status(404).json({ message: 'No user found with this id' });
        }

        res.json(dbUserData);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router;





