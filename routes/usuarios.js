const express = require("express");
const router = express.Router();
const { check } = require('express-validator');

const usuarioController = require("../controller/usuarioController");

router.post("/",
    [
        check('nombre', 'El Campo es obligatorio').not().isEmpty(),
        check('email', 'Agregar un email valido!').isEmail(),
        check('password', 'Debe contener minimo 6 caracteres').isLength({ min: 6 })
    ],
    usuarioController.createUsuario);

router.get("/", usuarioController.getUsuarios);

module.exports = router;
