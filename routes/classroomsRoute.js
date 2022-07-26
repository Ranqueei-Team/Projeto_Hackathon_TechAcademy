const express = require('express');
const router = express.Router();
const classroomsController = require('../controllers/classroomsController')
const { ensureAuthenticated } = require('../config/auth');

router.get('/new',  ensureAuthenticated, classroomsController.new);
router.post('/create',  ensureAuthenticated, classroomsController.create);
router.get('/show/:id',  ensureAuthenticated, classroomsController.show);
router.get('/edit/:id', ensureAuthenticated, classroomsController.edit);
router.post('/update',  ensureAuthenticated, classroomsController.update);
router.get('/', ensureAuthenticated, classroomsController.index);

module.exports = router;