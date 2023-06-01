const { Post } = require('../models');

// Define the data for the posts
const postData = [
  {
    title: 'Exploring the World of Web Development',
    blogPost: 'Web development is an exciting and ever-evolving field...',  
    userId: 1 
  },
  {
    title: 'Finding Balance in Life and Work',
    blogPost: 'Finding the right balance between work and personal life...', 
    userId: 2 
  },
  {
    title: 'Discovering My Passion for Design',
    blogPost: 'Throughout my journey, I realized that design was...', 
    userId: 3 
  },
  {
    title: 'The Power of Online Collaboration',
    blogPost: 'Online collaboration has transformed the way we work...', 
    userId: 4 
  },
];

// Function to seed posts
const seedPosts = () => {
  // Use the bulkCreate method of the Post model to create all posts in the postData array
  return Post.bulkCreate(postData);
};

module.exports = seedPosts;
