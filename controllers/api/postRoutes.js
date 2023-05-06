const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// POST a new post
router.post('/', withAuth, async (req, res) => {
    if (!req.session.user_id) {
      return res.status(401).json({ msg: 'Please login!' });
    }
    try {
      const newPost = await Post.create({
        ...req.body,
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.user_id,
      });
      res.status(200).json(newPost);

    } catch (err) {
      res.status(400).json(err);
    }
});


// UPDATE a post
router.put('/:id', async (req, res) => {
    try {
        if (!req.session.user_id) {
            return res.status(401).json({ msg: 'Please login!' });
        }
        const postData = await Post.update(req.body, {
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        if (!postData[0]) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.json(postData);

    } catch (err) {
        res.status(500).json(err);
    }
});


// DELETE a post
router.delete('/:id', withAuth, async (req, res) => {
    try {
        if (!req.session.user_id) {
            return res.status(401).json({ msg: 'Please login!' });
        }
        const postData = await Post.destroy({
            where: {
            id: req.params.id,
            user_id: req.session.user_id,
        },
        });
        if (!postData) {
            return res.status(404).json({ message: 'No post found with this id' });
        }
        res.status(200).json(postData);

    } catch (err) {
      res.status(500).json(err);
    }
});


module.exports = router;