const express = require('express');
const router = express.Router();
const managerController = require("../controllers/managerController");
const { ensureAuthenticated } = require('../config/auth');



module.exports = router;