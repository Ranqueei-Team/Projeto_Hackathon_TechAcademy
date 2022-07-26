const express = require('express');
const router = express.Router();
const rewardsController = require('../controllers/rewardsController')
const { ensureAuthenticated } = require('../config/auth');

router.get('/new/:classroomId',  rewardsController.new);
router.post('/create',  rewardsController.create);
router.get('/show/:id',  rewardsController.show);
router.get('/edit/:id',  rewardsController.edit);
router.post('/update', rewardsController.update);
router.get('/', rewardsController.index);

module.exports = router;