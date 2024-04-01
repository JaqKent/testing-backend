const mongoose = require('mongoose');
const CambioSchema = require('./Changes');

const IncidenciaSchema = mongoose.Schema({
    incidenciaNumber: {
        type: String,

    },
    year: {
        type: String,
        required: true,
    },
    month: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
        required: true,
    },
    criticidad: {
        type: String,
    },
    fechaCreacion: {
        type: Date,
        default: Date.now()
    },
    fechaModificacion: {
        type: String,
    },
    asignado: {
        type: String,
    },
    estado: {
        type: String,
    },
    observaciones: {
        type: String,
    },
    enBacklog: {
        type: Boolean,
        default: false
    },
    cambios: [CambioSchema]

})

module.exports = mongoose.model('Incidencia', IncidenciaSchema);