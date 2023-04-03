// Import required modules
const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Route to get all comments
router.get('/', async (req, res) => {
    try {
        const dbCommentData = await Comment.findAll();
        res.json(dbCommentData);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// Route to create a new comment with authentication middleware
router.post('/', withAuth, async (req, res) => {
    // expects => {comment_text: "This is the comment", user_id: 1, post_id: 2}
    try {
        const dbCommentData = await Comment.create({
            comment_text: req.body.comment_text,
            user_id: req.session.user_id,
            post_id: req.body.post_id
        });
        res.json(dbCommentData);
    } catch (err) {
        console.error(err);
        res.status(400).json(err);
    }
});

// Route to delete a comment with authentication middleware
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const dbCommentData = await Comment.destroy({
            where: {
                id: req.params.id
            }
        });

        if (!dbCommentData) {
            res.status(404).json({ message: 'No comment found with this id!' });
            return;
        }

        res.json(dbCommentData);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// Export the configured router
module.exports = router;
