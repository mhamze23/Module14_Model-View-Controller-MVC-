const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Endpoint to get all comments
router.get('/', async (req, res) => {
  try {
    const dbCommentData = await Comment.findAll({
      include: [{ model: User, attributes: ['username'] }],
    });

    // If successful, send the comment data back as JSON
    res.status(200).json(dbCommentData);
  } catch (err) {
    // If server error, send the error message back
    res.status(500).json(err);
  }
});

// Endpoint to get a comment by its ID
router.get('/:id', async (req, res) => {
  try {
    const dbCommentData = await Comment.findByPk(req.params.id, {
      include: [{ model: User, attributes: ['username'] }],
    });

    // If no comment is found by the ID, return an error message
    if (!dbCommentData) {
      res.status(404).json({ message: 'No comment found with this ID.' });
      return;
    }

    // If successful, send the comment data back as JSON
    res.status(200).json(dbCommentData);
  } catch (err) {
    // If server error, send the error message back
    res.status(500).json(err);
  }
});

// Endpoint to create a new comment
router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    // If successful, send the new comment's data back as JSON
    res.status(200).json(newComment);
  } catch (err) {
    // If server error, send the error message back
    res.status(500).json(err);
  }
});

// Endpoint to delete a comment
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const dbCommentData = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    // If no comment is found by the ID, return an error message
    if (!dbCommentData) {
      res.status(404).json({ message: "The comment with this ID does not exist." });
      return;
    }

    // If successful, send the deleted comment's data back as JSON
    res.status(200).json(dbCommentData);
  } catch (err) {
    // If server error, send the error message back
    res.status(500).json(err);
  }
});

module.exports = router;
