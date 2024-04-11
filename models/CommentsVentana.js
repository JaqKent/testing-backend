const mongoose = require('mongoose');
const Cambio = require('./Changes');


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
    cambios: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cambio'
    }]
})

CommentsVentanaSchema.pre('save', async function (next) {
    try {
        if (this.isNew) {
            const cambio = new Cambio({
                elementoId: this.ventanas,
                tipoElemento: 'ventana',
                cambios: this.update
            });
            await cambio.save();
            this.cambios = [cambio._id];
        } else {
            const cambiosAnteriores = await Cambio.find({ elementoId: this.ventanas });
            const cambio = new Cambio({
                elementoId: this.ventanas,
                tipoElemento: 'ventana',
                cambios: this.update
            });
            await cambio.save();
            cambiosAnteriores.push(cambio._id);
            this.cambios = cambiosAnteriores;
        }
        next();
    } catch (error) {
        next(error);
    }
});

CommentsVentanaSchema.post('save', async function (doc) {
    try {
        if (this.isNew) {
            await Cambio.findByIdAndUpdate(this.cambios[0], { $push: { cambios: this.update } });
        } else {
            const cambiosAnteriores = await Cambio.findById(this.cambios[0]);
            cambiosAnteriores.cambios.push(this.update);
            await cambiosAnteriores.save();
        }
    } catch (error) {
        console.error('Error al registrar cambios:', error);
    }
});

module.exports = mongoose.model('CommentsVentana', CommentsVentanaSchema);