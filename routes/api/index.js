const router = require('express').Router();
const articleRoutes = require('./articles');
const mntRoutes = require('./mnt');
const tweetRoutes = require('./tweet');

// Medical News Today routes
router.use('/articles', articleRoutes);

router.use('/mnt', mntRoutes);

router.use('/tweets', tweetRoutes);

module.exports = router;