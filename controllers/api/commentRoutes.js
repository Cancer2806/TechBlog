// Define dependencies
const router = require('express').Router();
const { Comments } = require('../../models');
const withAuth = require('../../utils/auth');

// Route used to add a comment to a blog, along with the commenters id
router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comments.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

// route that a logged in user can use to delete inappropriate comments againt his blog posts
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comments.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!commentData) {
      res.status(404).json({ message: 'Comment not found!' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
