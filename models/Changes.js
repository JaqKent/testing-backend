const mongoose = require('mongoose');

const CambioSchema = mongoose.Schema({
    fecha: {
        type: Date,
        default: Date.now()
    },
    campo: {
        type: String,
        required: true
    },
    valorAnterior: {
        type: mongoose.Schema.Types.Mixed,
    },
    valorNuevo: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    }
});


module.exports = CambioSchema;