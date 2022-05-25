// Use express for route control
const router = require('express').Router();

// Define routes
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoute');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;
