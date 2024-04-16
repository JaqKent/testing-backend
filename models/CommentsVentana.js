const mongoose = require('mongoose');
const Cambio = require('./Changes');
const Windows = require("./Ventanas")


const CommentsVentanaSchema = mongoose.Schema({
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
    ventanas: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Windows'
    },
})
CommentsVentanaSchema.post('save', async function (doc) {
    try {
        // Crear un nuevo documento de cambio
        const cambio = new Cambio({
            elementoId: doc._id,
            tipoElemento: 'commentVentana',
            cambios: [{
                campo: 'comentario',
                valorNuevo: doc.update
            }],
            ventana: doc.ventanas
        });

        // Guardar el nuevo documento de cambio
        await cambio.save();
    } catch (error) {
        console.error('Error al crear documento de cambio:', error);
    }
});
module.exports = mongoose.model('CommentsVentana', CommentsVentanaSchema);