const mongoose = require('mongoose');

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
    cambios: [CambioSchema]
})

module.exports = mongoose.model('CommentsVentana', CommentsVentanaSchema);