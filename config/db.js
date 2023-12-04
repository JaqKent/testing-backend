const mongoose = require('mongoose');
require("dotenv").config({ path: ".env" });

// cramos una funcion, como es una funcion la exporto para usar en otros files
const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.STRING_SERVER_MONGO, {})
        console.log("Conectado a MongoDB ATLAS!");
    } catch (error) {
        console.log(error);
        process.exit(1); //detener la app
    }
}

module.exports = conectarDB