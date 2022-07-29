const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController')
const { ensureAuthenticated } = require('../config/auth');

router.get('/new', usersController.new);
router.post('/create', usersController.create);
router.get('/edit/:id', ensureAuthenticated, usersController.edit);
router.post('/update', ensureAuthenticated, usersController.update);
router.get('/registration', usersController.registration);
router.get('/login', usersController.GETlogin);
router.post('/login', usersController.POSTlogin);
router.get('/logout', usersController.logout);

module.exports = router;