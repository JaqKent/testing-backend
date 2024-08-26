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

    },
    descripcion: {
        type: String
    },
    estado: {
        type: String,

    },
    fechaImplementacion: {
        type: String,

    },
    urgencia: {
        type: String,

    },
    crq: {
        type: String,

    },
    ejecutaTarea: {
        type: String,

    },
    controla: {
        type: String,

    },
    pruebasPost: {
        type: String,

    },
    afectaIdp: {
        type: String,

    },
    impactoNotificacion: {
        type: String,

    },
    enBacklog: { type: Boolean, default: false },

    cambios: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cambio'
    }]
});


WindowsSchema.pre('findOneAndUpdate', async function () {
    try {
        this._oldDocument = await this.model.findOne(this.getQuery());
    } catch (error) {
        console.error('Error al obtener el documento antes de la actualización:', error);
    }
});

WindowsSchema.post('findOneAndUpdate', async function (doc) {
    try {

        const oldDoc = this._oldDocument;
        const cambiosRegistrados = [];

        const camposExistentes = Object.keys(oldDoc._doc);

        const camposActualizados = Object.keys(doc._doc);

        const camposIgnorados = ['_id', 'semana', "cambios"];
        const camposAComparar = camposExistentes.filter(campo => !camposIgnorados.includes(campo));

        camposAComparar.forEach(campo => {
            const valorAnterior = oldDoc._doc[campo];
            const valorNuevo = doc[campo];

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
                tipoElemento: 'ventana',
                cambios: cambiosRegistrados,
                semana: doc.semana
            });
        } else {
            console.log('No se han detectado cambios');
        }
    } catch (error) {
        console.error('Error al registrar cambios:', error);
    }
});
module.exports = mongoose.model('Windows', WindowsSchema);