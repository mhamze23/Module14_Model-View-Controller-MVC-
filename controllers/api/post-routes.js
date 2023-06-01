const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// Route to create a new post
router.post('/', withAuth, async (req, res) => {
  try {
    // Create a new post linked to the current user
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    // If successful, respond with the new post data
    res.status(200).json(newPost);
  } catch (err) {
    // If error, respond with error
    res.status(500).json(err);
  }
});

// Route to edit a post
router.put('/:id', withAuth, async (req, res) => {
  try {
    // Update the post description where the post id and user id match the request
    const dbPostData = await Post.update({
      description: req.body.description,
    }, { 
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    // If no post data is returned, the post was not found
    if (!dbPostData) {
      res.status(404).json({ message: "No post found with this ID." });
      return;
    }

    // If successful, respond with the updated post data
    res.status(200).json(dbPostData);
  } catch (err) {
    // If error, respond with error
    res.status(500).json(err);
  }
});

// Route to delete a post
router.delete('/:id', withAuth, async (req, res) => {
  try {
    // Delete the post where the post id and user id match the request
    const dbPostData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    // If no post data is returned, the post was not found
    if (!dbPostData) {
      res.status(404).json({ message: "No post found with this ID." });
      return;
    }

    // If successful, respond with the deleted post data
    res.status(200).json(dbPostData);
  } catch (err) {
    // If error, respond with error
    res.status(500).json(err);
  }
});

// Export the router
module.exports = router;
