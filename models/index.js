// Import all models
const Post = require('./post');
const User = require('./user');
const Comment = require('./comment');

// Create associations between models

// A User has many Posts
User.hasMany(Post, {
    foreignKey: 'user_id'
});

// A Post belongs to a User
Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

// A Comment belongs to a User
Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

// A Comment belongs to a Post
Comment.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: 'SET NULL'
});

// A User has many Comments
User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

// A Post has many Comments
Post.hasMany(Comment, {
    foreignKey: 'post_id'
});

// Export models as an object
module.exports = { User, Post, Comment };
