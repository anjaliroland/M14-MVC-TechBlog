const router = require('express').Router();
const { User, Post, Comment } = require('../models');


// GET all posts from logged in user
router.get('/', withAuth, async (req, res) => {
    try {
        const dbPostData = await Post.findAll({
            attributes: ['id', 'title', 'content', 'date_created'],
            include: [
                {
                    model: Comment,
                    attributes: [
                        'id',
                        'comment_text',
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
        where: {
            user_id: req.session.user_id,
        },
    });
    const posts = dbPostData.map((post) => post.get({ plain: true }));
    res.render('dashboard', {
        posts,
        loggedIn: true,
        username: req.session.username,
    });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


// GET new post
router.get('/new', withAuth, async (req, res) => {
    try {
        res.render('addPost', { loggedIn: true, username: req.session.username });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

  
// UPDATE a post
router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const dbPostData = await Post.findOne({
            where: {
                id: req.params.id,
            },
            attributes: ['id', 'title', 'content', 'date_created'],
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
                {
                    model: Comment,
                    attributes: [
                        'id',
                        'comment_text',
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
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        const post = dbPostData.get({ plain: true });
        console.log('sending ' + req.session.username);
        res.render('editPost', {
            post,
            loggedIn: true,
            username: req.session.username,
            id: req.params.id,
        });

    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});

module.exports = router;