const express = require('express');
const router = express.Router();
const missionsController = require('../controllers/missionsController')
const { ensureAuthenticated } = require('../config/auth');

router.get('/new',  missionsController.new);
router.post('/create',  missionsController.create);
router.get('/show/:id',  missionsController.show);
router.get('/edit/:id',  missionsController.edit);
router.post('/update', missionsController.update);
router.get('/', missionsController.listMissionsByClassrooms);

module.exports = router;