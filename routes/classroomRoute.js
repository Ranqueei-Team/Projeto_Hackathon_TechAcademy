const express = require('express');
const router = express.Router();
const classroomsController = require('../controllers/classroomsController')
const { ensureAuthenticated } = require('../config/auth');

router.get('/new',  classroomsController.new);
router.post('/create',  classroomsController.create);
router.get('/show/:id',  classroomsController.show);
router.get('/edit/:id', classroomsController.edit);
router.post('/update',  classroomsController.update);
router.get('/', classroomsController.index);

module.exports = router;