const router = require('express').Router();
const { Blogs } = require('../../models');
const withAuth = require('../../utils/auth');

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

// router.get('/blog/:id', async (req, res) => {
//   console.log(`Hi, I'm here in the BlogRoutes`);
//   try {
//     const blogData = await Blogs.findByPk(req.params.id, {
//       include: [
//         {
//           model: Users,
//           attributes: ['userName'],
//         },
//         {
//           model: Comments,
//           include: {
//             model: Users,
//             attributes: ['userName'],
//           },
//         },
//       ],
//     });

//     const blog = blogData.get({ plain: true });

//     res.render('userblog', {
//       ...blog,
//       logged_in: req.session.logged_in
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });