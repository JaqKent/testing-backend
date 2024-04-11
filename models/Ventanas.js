const mongoose = require('mongoose');
const Cambio = require('./Changes');

const WindowsSchema = mongoose.Schema({
    semana: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Week',
        trim: true
    },
    solicitante: {
        type: String,
        trim: true,
        required: true
    },
    descripcion: {
        type: String
    },
    estado: {
        type: String,
        required: true
    },
    fechaImplementacion: {
        type: String,
        required: true
    },
    urgencia: {
        type: String,
        required: true
    },
    crq: {
        type: String,
        required: true
    },
    ejecutaTarea: {
        type: String,
        required: true
    },
    controla: {
        type: String,
        required: true
    },
    pruebasPost: {
        type: String,
        required: true
    },
    afectaIdp: {
        type: String,
        required: true
    },
    impactoNotificacion: {
        type: String,
        required: true
    },
    enBacklog: { type: Boolean, default: false },

    cambios: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cambio'
    }]
});


WindowsSchema.pre('save', async function (next) {
    if (this.isModified()) {
        const cambios = this.modifiedPaths().filter(path => path !== 'cambios');
        this.cambios = cambios.map(campo => ({
            campo,
            valorAnterior: this._original[campo],
            valorNuevo: this[campo]
        }));
    }
    next();
});


WindowsSchema.post('findOneAndUpdate', async function (doc) {
    try {
        if (this._update && Object.keys(this._update).length > 0) {
            const cambios = Object.keys(this._update);
            const cambiosRegistrados = await registrarCambios(doc._id, 'ventana', cambios);
            await Windows.findByIdAndUpdate(doc._id, { $push: { cambios: { $each: cambiosRegistrados.map(cambio => cambio._id) } } });
        }
    } catch (error) {
        console.error('Error al registrar cambios:', error);
    }
});

module.exports = mongoose.model('Windows', WindowsSchema);