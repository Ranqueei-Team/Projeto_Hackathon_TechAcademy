const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController')


router.get('/new', usersController.new);
router.post('/create', usersController.create);
router.get('/show/:id', usersController.show);
router.get('/edit/:id', usersController.edit);
router.post('/update', usersController.update);
router.get('/', usersController.index);
router.get('/login', usersController.GETlogin);
router.post('/login', usersController.POSTlogin);
router.get('/logout', usersController.logout);


module.exports = router;