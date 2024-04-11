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
        enum: ['ventana', 'incidencia'],
        required: true
    },
    cambios: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    }
});

CambioSchema.index({ fecha: 1 });

module.exports = mongoose.model('Cambio', CambioSchema);
