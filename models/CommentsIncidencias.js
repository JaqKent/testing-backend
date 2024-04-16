const mongoose = require('mongoose');
const Cambio = require('./Changes');

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
})
CommentsIncidenciaSchema.post('save', async function (doc) {
    try {

        const cambio = new Cambio({
            elementoId: doc._id,
            tipoElemento: 'commentIncidencia',
            cambios: [{
                campo: 'comentario',
                valorNuevo: doc.update
            }],
            incidencias: doc.incidencias
        });

        await cambio.save();
    } catch (error) {
        console.error('Error al crear documento de cambio:', error);
    }
});

module.exports = mongoose.model('CommentsIncidencia', CommentsIncidenciaSchema);