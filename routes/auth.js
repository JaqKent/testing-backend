const express = require("express");
const router = express.Router();
const { check } = require('express-validator');

const authController = require('../controller/authController')

router.post("/",
    [
        check('email', 'Agregar un email valido!').isEmail(),
        check('password', 'Debe contener minimo 6 caracteres').isLength({ min: 6 })
    ],
    authController.login);

module.exports = router;
