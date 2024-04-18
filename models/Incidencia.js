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
IncidenciaSchema.pre('findOneAndUpdate', async function () {
    try {

        this._oldDocument = await this.model.findOne(this.getQuery());
    } catch (error) {
        console.error('Error al obtener el documento antes de la actualización:', error);
    }
});

IncidenciaSchema.post('findOneAndUpdate', async function (doc) {
    try {

        const oldDoc = this._oldDocument;

        const cambiosRegistrados = [];

        const camposExistentes = Object.keys(oldDoc._doc);

        const camposActualizados = Object.keys(doc._doc);

        const camposIgnorados = ['_id', 'fechaCreacion', 'cambios'];
        const camposAComparar = camposExistentes.filter(campo => !camposIgnorados.includes(campo));

        camposAComparar.forEach(campo => {
            const valorAnterior = oldDoc._doc[campo];
            const valorNuevo = doc._doc[campo];

            if (valorAnterior !== valorNuevo) {
                cambiosRegistrados.push({
                    campo,
                    valorAnterior,
                    valorNuevo
                });
            }
        });

        const camposNuevos = camposActualizados.filter(campo => !camposExistentes.includes(campo) && !camposIgnorados.includes(campo));

        camposNuevos.forEach(campo => {
            cambiosRegistrados.push({
                campo,
                valorAnterior: undefined,
                valorNuevo: doc._doc[campo]
            });
        });

        if (cambiosRegistrados.length > 0) {
            await Cambio.create({
                elementoId: doc._id,
                tipoElemento: 'incidencia',
                cambios: cambiosRegistrados
            });
        } else {
            console.log('No se han detectado cambios');
        }
    } catch (error) {
        console.error('Error al registrar cambios:', error);
    }
});


module.exports = mongoose.model('Incidencia', IncidenciaSchema);