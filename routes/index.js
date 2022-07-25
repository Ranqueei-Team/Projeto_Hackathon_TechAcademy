const express = require ("express");
const router = express.Router();
const indexController = require("../controllers/indexController");

router.get("/", indexController.index);

router.get("/create", indexController.create);

module.exports = router;