// Define dependencies
const router = require('express').Router();
const { Blogs } = require('../../models');
const withAuth = require('../../utils/auth');

// route used to post a new blog from the logged in User
router.post('/', withAuth, async (req, res) => {
  try {
    const newBlog = await Blogs.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

// route used to update a blog of the logged in User (only the user that created a blog can update the blog)
router.put('/', withAuth, async (req, res) => {
  try {
    const updatedBlog = await Blogs.update({
      title: req.body.title,
      contents: req.body.contents
    },
      {
        where:
        {
          id: req.body.blog_id,
          user_id: req.session.user_id,
        }
    });

    res.status(200).json(updatedBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

// route used to delete a blog selected by the logged in User (only the user that created a blog can delete the blog)
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blogs.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: 'No Blog found with this id!' });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
