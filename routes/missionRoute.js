const express = require('express');
const router = express.Router();
const missionsController = require('../controllers/missionsController')
const { ensureAuthenticated } = require('../config/auth');

router.get('/new/:missionid', ensureAuthenticated, missionsController.new);
router.post('/create', ensureAuthenticated, missionsController.create);
router.get('/show/:id', ensureAuthenticated, missionsController.show);
router.get('/edit/:id', ensureAuthenticated, missionsController.edit);
router.post('/update', ensureAuthenticated, missionsController.update);
router.get('/', ensureAuthenticated, missionsController.index);

module.exports = router;