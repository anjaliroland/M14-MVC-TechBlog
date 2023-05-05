const { Post } = require('../models');

const postData = [
    {
        title: "Bringing Positivity to Code Reviews",
        content: "How to Give and Receive Constructive Feedback",
        user_id: '1',
        date_created: '03-15-23',
    },
    {
        title: "From Excel to SQL",
        content: "The Businesswoman's Guide to Databases",
        user_id: '2',
        date_created: '01-03-23',
    },
    {
        title: "Managing Codebase Chaos",
        content: "How to Use Agile Methodology to Keep Your Projects on Track",
        user_id: '3',
        date_created: '05-11-23',
    },
    {
        title: "Developing Beautiful UI",
        content: "Tips and Tricks from a Fashionista Turned Web Developer",
        user_id: '4',
        date_created: '07-22-23',
    },
    {
        title: "Collaborating Across Cultures",
        content: "Best Practices for Working with Remote Teams",
        user_id: '7',
        date_created: '12-14-22',
    },
    {
        title: "Mentorship in Tech",
        content: "How to Find and Be a Great Mentor",
        user_id: '8',
        date_created: '04-27-23',
    },
    {
        title: "The Power of Planning",
        content: "How Planning Before Coding causes Less Headaches",
        user_id: '5',
        date_created: '02-05-23',
    },
];

const seedPost = () => Post.bulkCreate(postData);

module.exports = seedPost;