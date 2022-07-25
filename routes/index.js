const express = require ("express");
const router = express.Router();
const indexController = require("../controllers/indexController");


router.get("/", indexController.index);

router.get("/dashboard", indexController.dashboard);

module.exports = router;