const express = require('express');
const router = express.Router();
const rewardsController = require('../controllers/rewardsController')
const { ensureAuthenticated } = require('../config/auth');

router.get('/new',  rewardsController.new);
router.post('/create',  rewardsController.create);
router.get('/edit/:id',  rewardsController.edit);
router.post('/update', rewardsController.update);
router.get('/', rewardsController.listRewardsByClassrooms);

module.exports = router;