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


WindowsSchema.pre('findOneAndUpdate', async function () {
    try {
        // Obtener el documento antes de la actualización y almacenarlo en la instancia
        this._oldDocument = await this.model.findOne(this.getQuery());
    } catch (error) {
        console.error('Error al obtener el documento antes de la actualización:', error);
    }
});

WindowsSchema.post('findOneAndUpdate', async function (doc) {
    try {
        // Acceder al documento antes de la actualización desde la instancia
        const oldDoc = this._oldDocument;
        console.log('Documento antes de la actualización:', oldDoc);

        // Comparar los valores antes y después de la actualización
        const cambiosRegistrados = [];

        for (const campo in oldDoc._doc) {
            if (oldDoc._doc.hasOwnProperty(campo)) {
                // Ignorar el campo _id
                if (campo === '_id') continue;

                // Ignorar el campo semana si no está presente en el body
                if (campo === 'semana' && !this._update.$set.hasOwnProperty('semana')) continue;

                const valorAnterior = oldDoc._doc[campo];
                const valorNuevo = doc[campo];

                // Verificar si el valor ha cambiado
                if (valorAnterior !== valorNuevo) {
                    cambiosRegistrados.push({
                        campo,
                        valorAnterior,
                        valorNuevo
                    });
                }
            }
        }

        // Guardar los cambios en la colección de Cambio
        if (cambiosRegistrados.length > 0) {
            console.log('Se han registrado cambios:', cambiosRegistrados);
            await Cambio.create({
                elementoId: doc._id,
                tipoElemento: 'ventana',
                cambios: cambiosRegistrados
            });
        } else {
            console.log('No se han detectado cambios');
        }
    } catch (error) {
        console.error('Error al registrar cambios:', error);
    }
});




















module.exports = mongoose.model('Windows', WindowsSchema);