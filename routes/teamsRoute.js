const express = require('express');
const router = express.Router();
const teamsController = require('../controllers/teamsController')
const { ensureAuthenticated } = require('../config/auth');

router.get('/new',  teamsController.new);
router.post('/create',  teamsController.create);
router.get('/edit/:id',  teamsController.edit);
router.post('/update',teamsController.update);
router.get('/', teamsController.listTeamsByClassrooms);
router.get('/studentByTeam/:teamId', teamsController.studentByTeam);
router.post('/searchStudent', teamsController.searchStudentByEmail);
router.get('/addStudentByTeam/:studentId/:teamId', teamsController.addStudentByTeam);
router.get('/listStudentsByTeam', teamsController.listStudentsByTeam);

module.exports = router;