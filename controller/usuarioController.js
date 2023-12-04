const Usuario = require('../models/Usuario');
const bcryptsjs = require('bcryptjs');
const { validationResult } = require('express-validator');

exports.createUsuario = async (req, res) => {
    try {
        const error = validationResult(req); // genera un array
        if (!error.isEmpty())
            return res.status(400).json({ erores: error.array() });

        const { email, password } = req.body;

        let usuario, usuarioEmail;

        usuarioEmail = await Usuario.findOne({ email });

        if (usuarioEmail == null) {
            const salt = await bcryptsjs.genSalt(10);
            usuario = new Usuario(req.body);
            usuario.password = await bcryptsjs.hash(password, salt);
            await usuario.save();
            res.send("Usuario Creado!!!");
        } else {
            return res.status(400).json({ msg: "El Usuario ya Existe !!" });
        }
    } catch (error) {
        console.log(error);
        res.status(400).send("Error en Crear el usuario");
    }
}

exports.getUsuarios = async (req, res) => {
    try {
        let usuarios;
        usuarios = await Usuario.find({});
        res.send(usuarios);

    } catch (error) {

    }
}