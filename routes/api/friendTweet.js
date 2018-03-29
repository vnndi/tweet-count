const router = require('express').Router();
const tweetController = require('../../controllers/tweetController');

// Matches with "/api/friendtweets"
router
.route('/')
.get(tweetController.findFriendTweet)

module.exports = router;