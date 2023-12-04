const mongoose = require('mongoose');

const OnlyVentanaOldSchema = mongoose.Schema({
    semana: {
        type: String,
        trim: true,
        require: true
    },
    solicitante: {
        type: String,
        trim: true,
        require: true
    },
    descripcion: {
        type: String
    },
    estado: {
        type: String,
        require: true
    },
    fechaImplementacion: {
        type: String,
        require: true
    },
    urgencia: {
        type: String,
        require: true
    },
    crq: {
        type: String,
        require: true
    },
    ejecutaTarea: {
        type: String,
        require: true
    },
    controla: {
        type: String,
        require: true
    },
    pruebasPost: {
        type: String,
        require: true
    },
    afectaIdp: {
        type: String,
        require: true
    },
    impactoNotificacion: {
        type: String,
        require: true
    },
})

module.exports = mongoose.model('OnlyVentanaOld', OnlyVentanaOldSchema);