// Define dependencies
const router = require('express').Router();
const { Users, Blogs, Comments } = require('../models');
const withAuth = require('../utils/auth');

// Homepage route for display of all blogs
router.get('/', async (req, res) => {
  try {
    // Get all Blogs and JOIN with user data
    const blogData = await Blogs.findAll({
      include: [{model: Users,
        attributes: ['userName'],
      },],
      order: [["updated_at", "DESC"],],
    });

    // Serialise data so the template can read it
    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    // Pass serialised data and session flag into template
    res.render('homepage', {
      blogs,
      logged_in: req.session.logged_in,
      user_id: req.session.user_id
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// route for display of selected blog
router.get('/blog/:id', async (req, res) => {
  try {
    // Use blog id passed through params to find blog and link to creator and any comments (inc user who commented)
    const blogData = await Blogs.findByPk(req.params.id, {
      include: [
        {
          model: Users,
          attributes: ['userName'],
        },
        {
          model: Comments,
          include: {
            model: Users,
            attributes: ['userName'],
          },
          order: [
            ["updated_at", "DESC"],
          ],
        },
      ],
    });

    // serialise data and pass into template
    const blog = blogData.get({ plain: true });

    res.render('showblog', {
      ...blog,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// route to display all blogs created by the logged in user - the users dashboard
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID (logged in user) and link to blogs
    const userData = await Users.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Blogs }],
      order: [["updated_at", "DESC"],],
    });

    // serialise data and pass into the template
    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// route for updating or deleting a selected blog.  Accessible only through a users Dashboard
router.get('/update/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blogs.findByPk(req.params.id, {
      include: [
        {
          model: Users,
          attributes: ['userName'],
        },
        {
          model: Comments,
          include: {
            model: Users,
            attributes: ['userName', 'updated_at'],
          },
          order: [
            ["updated_at", "DESC"],
          ],
        },
      ],
      order: [
        ["updated_at", "DESC"],
      ],
    });
    // serialise data and pass to template designed for updating a specific blog
    const blog = blogData.get({ plain: true });

    res.render('updateblog', {
      ...blog,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// route for logging in.  If already logged in, user redirected to their dashboard
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('login');
});

module.exports = router;
