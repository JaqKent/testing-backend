const mongoose = require('mongoose');

const IncidenciaSchema = mongoose.Schema({
    incidenciaNumber: {
        type: String,
        required: true,
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
    }

})

module.exports = mongoose.model('Incidencia', IncidenciaSchema);