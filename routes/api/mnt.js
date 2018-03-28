const router = require('express').Router();
const mntController = require('../../controllers/mntController');

// Matches with "/api/mnt"
router
.route('/')
.get(mntController.findAll)

module.exports = router;