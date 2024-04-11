const mongoose = require('mongoose');
const Cambio = require('./Changes');


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
    cambios: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cambio'
    }]

})
IncidenciaSchema.pre('save', async function (next) {
    try {
        if (this.isNew) {
            // Si es una nueva incidencia, no hay cambios registrados
            return next();
        }

        const cambios = this.modifiedPaths().filter(path => path !== 'cambios');
        if (cambios.length > 0) {

            const cambiosRegistrados = await registrarCambios(this._id, 'incidencia', cambios);
            this.cambios = cambiosRegistrados.map(cambio => cambio._id);
        }
        next();
    } catch (error) {
        console.error('Error al registrar cambios antes de guardar la incidencia:', error);
        next(error);
    }
});


IncidenciaSchema.post('findOneAndUpdate', async function (doc) {
    try {
        if (this._update && Object.keys(this._update).length > 0) {

            const cambios = Object.keys(this._update);
            const cambiosRegistrados = await registrarCambios(doc._id, 'incidencia', cambios);
            await Incidencia.findByIdAndUpdate(doc._id, { $push: { cambios: { $each: cambiosRegistrados.map(cambio => cambio._id) } } });
        }
    } catch (error) {
        console.error('Error al registrar cambios después de actualizar la incidencia:', error);
    }
})

module.exports = mongoose.model('Incidencia', IncidenciaSchema);