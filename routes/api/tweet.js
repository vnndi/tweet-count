const router = require('express').Router();
const tweetController = require('../../controllers/tweetController');

// Matches with "/api/tweet"
router
.route('/')
.get(tweetController.findAll)

module.exports = router;