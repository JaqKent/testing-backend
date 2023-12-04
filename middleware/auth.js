const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    //Leer el Token del header
    const token = req.header('x-auth-token');

    //Revisar si viene el Token
    if (!token)
        return res.status(401).json({ msg: "Permisno no Valido o no exixte Token !!" })

    //Validar el Token
    try {
        const cifrado = jwt.verify(token, process.env.SECRETA);
        req.usuario = cifrado.usuario;
        next(); //para que pase el siguiente middleware

    } catch (error) {
        console.log(error);
        res.send(error.message)
    }
} 