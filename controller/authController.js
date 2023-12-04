const Usuario = require('../models/Usuario');
const bcryptsjs = require('bcryptjs');
const { validationResult } = require('express-validator');
require("dotenv").config({ path: ".env" });
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    try {
        // revisar si hay errores
        const error = validationResult(req);

        if (!error.isEmpty())
            return res.status(400).json({ erores: error.array() });

            const { email, password } = req.body;

            let usuario;
            
            usuario = await Usuario.findOne({ email });
            
            if (usuario) {
                //revisar el password
                const passCorrecto = await bcryptsjs.compare(password, usuario.password);
                if(!passCorrecto) {
                    return res.status(400).json({msg: "Validar datos Ingresados"})
                }
                // crear el Token
                const payload = {
                    usuario: {
                        id: usuario._id
                    }
                }
                jwt.sign(payload, process.env.SECRETA,{
                    expiresIn: 3600
                }, (error, token) => {
                    if(error) throw error;

                    res.json({token})
                })
            } else {
                res.status(400).json({ msg: "Verificar Datos Ingresados !!" });
            }

    } catch (error) {
        console.log("error: ", error)
    }
}