const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// GET all comments
router.get('/', async (req, res) => {
    try {
        const commentData = await Comment.findAll({});
        if (commentData.length === 0) {
            res.status(404).json({
                message: 'Comment field cannot be left blank. :( ',
            });
            return;
        }
        res.status(200).json(commentData);

    } catch (err) {
        res.status(500).json(err);
    }
});


// POST a new comment
router.post('/comment', withAuth, async (req, res) => {
    try {
        if (!req.session.user_id) {
            return res.status(401).json({ msg: 'Please login!' });
        }
        const { post_id, comment_text } = req.body;
        const newComment = await Comment.create({
            post_id,
            content,
            user_id: req.session.user_id,
        });
        res.status(200).json(newComment);

    } catch (err) {
      res.status(400).json(err);
    }
});


// UPDATE comment by id
router.put('/comment/:id', async (req, res) => {
    try {
        if (!req.session.user_id) {
            return res.status(401).json({ msg: 'Please login!' });
        }
        const commentData = await Comment.update(req.body, {
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        if (!commentData) {
            return res.status(404).json({ message: 'No post found with this id' });
        }
        res.json(commentData);

    } catch (err) {
        res.status(500).json(err);
    }
});


// DELETE a comment by id
router.delete('/comment/:id', withAuth, async (req, res) => {
    try {
        if (!req.session.user_id) {
            return res.status(401).json({ msg: 'Please login!' });
        }
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        if (!commentData) {
            res.status(404).json({ message: 'No comment found with this id' });
            return;
         }
        res.status(200).json(commentData);

    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;