const express = require('express');
const router = express.Router();
const teamsController = require('../controllers/teamsController')
const { ensureAuthenticated } = require('../config/auth');

router.get('/new',  teamsController.new);
router.post('/create',  teamsController.create);
router.get('/edit/:id',  teamsController.edit);
router.post('/update',teamsController.update);
router.get('/', teamsController.listTeamsByClassrooms);

module.exports = router;