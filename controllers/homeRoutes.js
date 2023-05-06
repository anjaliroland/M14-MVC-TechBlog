const router = require('express').Router();
const { User, Post, Comment } = require('../models');

// GET homepage (all posts)
router.get('/', async (req, res) => {
    try {
        const dbPostData = await Post.findAll({
            attributes: ['id', 'title', 'content', 'date_created'],
            include: [
                {
                    model: Comment,
                    attributes: [
                        'id',
                        'content',
                        'post_id',
                        'user_id',
                        'date_created',
                    ],
                    include: {
                        model: User,
                        attributes: ['username'],
                    },
                },
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });
        const posts = dbPostData.map((post) => post.get({ plain: true }));
        const resObj = { posts };
        if (req.session.loggedIn) {
            resObj.loggedIn = true;
            resObj.username = req.session.username;
            resObj.uid = req.session.user_id;
        }
        res.render('homepage', resObj);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


// GET posts by id
router.get('/posts/:id', async (req, res) => {
    try {
        const dbPostData = await Post.findOne({
            where: {
                id: req.params.id,
            },
            attributes: ['id', 'title', 'content', 'date_created', 'user_id'],
            include: [
                {
                    model: User,
                    required: true,
                    attributes: ['username'],
                },
                {
                    model: Comment,
                    attributes: [
                        'id',
                        'content',
                        'post_id',
                        'user_id',
                        'date_created',
                    ],
                    include: {
                        model: User,
                        attributes: ['username'],
                    },
                },
            ],
        });
        if (!dbPostData) {
            res.status(404).json({
                message: 'No post found with this id',
            });
            return;
        }
        const posts = dbPostData.get({ plain: true });
        const dbCommentData = await Comment.findAll({
            where: {
                post_id: req.params.id,
            },
            attributes: [
                'id',
                'content',
                'user_id',
                'post_id',
                'date_created',
            ],
            include: [
                {
                    model: User,
                    required: true,
                    attributes: ['username'],
                },
            ],
        });
        const comments = dbCommentData.map((post) =>
            post.get({ plain: true })
        );
        const resObj = { posts, comments };
        if (req.session.loggedIn) {
            resObj.loggedIn = true;
            resObj.username = req.session.username;
            resObj.uid = req.session.user_id;
        }
        res.render('post', resObj);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


// GET log in
router.get('/login', async (req, res) => {
    try {
        if (req.session.user) {
            res.redirect('/dashboard');
            return;
        }
        res.render('login');

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


// GET sign up
router.get('/signup', async (req, res) => {
    try {
        if (req.session.user) {
            res.redirect('/dashboard');
            return;
        }
        res.render('signup');
        
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router; 