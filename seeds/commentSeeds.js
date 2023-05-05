const { Comment } = require('../models');

const commentData = [
    {
        content: "Coach, your post is just what I needed to read!",
        user_id: '7',
        post_id: '1',
        date_written: '03-15-23',
    },
    {
        content: "Great post bruv!",
        user_id: '10',
        post_id: '5',
        date_written: '12-15-22',
    },
    {
        content: "You're amazing, let's invade France",
        user_id: '4',
        post_id: '2',
        date_written: '01-03-23',
    },
    {
        content: "Bingo el ringo! This is an ace of blog post!",
        user_id: '1',
        post_id: '3',
        date_written: '05-11-23',
    },
];

const seedCommment = () => Comment.bulkCreate(commentData);

module.exports = seedCommment;