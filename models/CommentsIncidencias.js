const mongoose = require('mongoose');
const CambioSchema = require('./Changes');

const CommentsIncidenciaSchema = mongoose.Schema({
    update: {
        type: String,
        trim: true,

    },
    usuarioCreador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    fechaCreacion: {
        type: Date,
        default: Date.now()
    },
    incidencias: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Incidencia'
    },
    cambios: [CambioSchema]
})

module.exports = mongoose.model('CommentsIncidencia', CommentsIncidenciaSchema);