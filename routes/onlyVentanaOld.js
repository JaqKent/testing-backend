const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth');

const onlyventaOldController = require("../controller/onlyVentanaOld");


router.get("/", onlyventaOldController.getVentana);

module.exports = router;