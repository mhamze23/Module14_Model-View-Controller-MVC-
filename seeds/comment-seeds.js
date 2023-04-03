const { Comment } = require('../models');

// Sample comment data
const commentData = [
  {
    comment_text: 'This is an interesting post!',
    user_id: 1,
    post_id: 1
  },
  {
    comment_text: 'I found this post very helpful.',
    user_id: 2,
    post_id: 2
  },
  {
    comment_text: 'Great insights on this topic.',
    user_id: 3,
    post_id: 3
  },
  {
    comment_text: 'Thanks for sharing this information.',
    user_id: 4,
    post_id: 4
  },
];

// Function to seed comments using bulkCreate
const seedComments = () => Comment.bulkCreate(commentData);

// Export the seedComments function
module.exports = seedComments;
