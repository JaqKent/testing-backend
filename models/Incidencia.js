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
        // Obtener el documento antes de la actualización y almacenarlo en la instancia
        this._oldDocument = await this.model.findOne(this.getQuery());
    } catch (error) {
        console.error('Error al obtener el documento antes de la actualización:', error);
    }
});

IncidenciaSchema.post('findOneAndUpdate', async function (doc) {
    try {
        // Acceder al documento antes de la actualización desde la instancia
        const oldDoc = this._oldDocument;
        console.log('Documento antes de la actualización:', oldDoc);

        // Comparar los valores antes y después de la actualización
        const cambiosRegistrados = [];

        // Obtener los campos existentes en el documento antes de la actualización
        const camposExistentes = Object.keys(oldDoc._doc);

        // Obtener los campos en el documento actualizado
        const camposActualizados = Object.keys(doc._doc);

        // Filtrar los campos que no se deben considerar para la comparación
        const camposIgnorados = ['_id', 'fechaCreacion', 'cambios'];
        const camposAComparar = camposExistentes.filter(campo => !camposIgnorados.includes(campo));

        // Verificar los cambios en los campos existentes
        camposAComparar.forEach(campo => {
            const valorAnterior = oldDoc._doc[campo];
            const valorNuevo = doc._doc[campo];

            // Verificar si el valor ha cambiado
            if (valorAnterior !== valorNuevo) {
                cambiosRegistrados.push({
                    campo,
                    valorAnterior,
                    valorNuevo
                });
            }
        });

        // Obtener los campos nuevos en el documento actualizado
        const camposNuevos = camposActualizados.filter(campo => !camposExistentes.includes(campo) && !camposIgnorados.includes(campo));

        // Agregar los campos nuevos como cambios
        camposNuevos.forEach(campo => {
            cambiosRegistrados.push({
                campo,
                valorAnterior: undefined,
                valorNuevo: doc._doc[campo]
            });
        });

        // Guardar los cambios en la colección de Cambio
        if (cambiosRegistrados.length > 0) {
            console.log('Se han registrado cambios:', cambiosRegistrados);
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