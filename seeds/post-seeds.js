const { Post } = require('../models');

// Post data
const postdata = [

    {
        title: 'Exploring the World of Web Development',
        blog_post: 'Web development is an exciting and ever-evolving field that offers endless opportunities for learning and growth. In recent years, the web development landscape has seen significant changes with the introduction of new technologies, frameworks, and tools. As developers, it is crucial to stay up-to-date with these changes and continuously expand our skillsets. By embracing new concepts and techniques, we can create cutting-edge websites and applications that cater to the needs of diverse audiences and adapt to the fast-paced digital world.',
        user_id: 1
    },
    {
        title: 'Finding Balance in Life and Work',
        blog_post: 'Finding the right balance between work and personal life can be challenging. It is essential to maintain a healthy work-life balance to reduce stress and improve overall well-being.',
        user_id: 2
    },
    {
        title: 'Discovering My Passion for Design',
        blog_post: 'Throughout my journey, I realized that design was more than just aesthetics. It involves problem-solving, creativity, and empathy to create meaningful experiences for users.',
        user_id: 3
    },
    {
        title: 'The Power of Online Collaboration',
        blog_post: 'Online collaboration has transformed the way we work, enabling teams to communicate and collaborate effectively across distances. This has led to increased efficiency and productivity in various industries.',
        user_id: 4
    },
];

// Function to seed posts
const seedPosts = () => Post.bulkCreate(postdata);

module.exports = seedPosts;
