const express = require('express');
const router = express.Router();
const managerController = require("../controllers/managerController");
const { ensureAuthenticated } = require('../config/auth');

router.get("/dashboard", ensureAuthenticated, managerController.dashboard);

module.exports = router;