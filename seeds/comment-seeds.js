const { Comment } = require('../models');

// Renamed comment_text to commentText, user_id to userId and post_id to postId
const commentData = [
  {
    commentText: 'This is an interesting post!',  
    userId: 1,  
    postId: 1   
  },
  {
    commentText: 'I found this post very helpful.',  
    userId: 2,  
    postId: 2   
  },
  {
    commentText: 'Great insights on this topic.',  
    userId: 3,  
    postId: 3   
  },
  {
    commentText: 'Thanks for sharing this information.',  
    userId: 4,  
    postId: 4   
  },
];

// Function to seed comments using bulkCreate
// bulkCreate function from Sequelize allows to create multiple records at once
const seedComments = () => Comment.bulkCreate(commentData);


module.exports = seedComments;
