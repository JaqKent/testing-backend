const mongoose = require('mongoose');


const CambioSchema = mongoose.Schema({
    fecha: {
        type: Date,
        default: Date.now()
    },
    elementoId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    tipoElemento: {
        type: String,
        enum: ['ventana', 'incidencia', "commentVentana", "commentIncidencia"],
        required: true
    },
    ventana: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Windows'
    },
    semana: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Week',
    },
    incidencias: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Incidencia'
    },
    cambios: [{
        campo: {
            type: String,
            required: true
        },
        valorAnterior: {
            type: mongoose.Schema.Types.Mixed
        },
        valorNuevo: {
            type: mongoose.Schema.Types.Mixed
        }
    }]
});

CambioSchema.index({ elementoId: 1 });

module.exports = mongoose.model('Cambio', CambioSchema);
