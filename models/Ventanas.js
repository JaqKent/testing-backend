const mongoose = require('mongoose');

const WindowsSchema = mongoose.Schema({
    semana: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Week',
        trim: true
    },
    solicitante: {
        type: String,
        trim: true,
        require: true
    },
    descripcion: {
        type: String
    },
    estado: {
        type: String,
        require: true
    },
    fechaImplementacion: {
        type: String,
        require: true
    },
    urgencia: {
        type: String,
        require: true
    },
    crq: {
        type: String,
        require: true
    },
    ejecutaTarea: {
        type: String,
        require: true
    },
    controla: {
        type: String,
        require: true
    },
    pruebasPost: {
        type: String,
        require: true
    },
    afectaIdp: {
        type: String,
        require: true
    },
    impactoNotificacion: {
        type: String,
        require: true
    },
    enBacklog: { type: Boolean, default: false },
    cambios: [CambioSchema]


})
WindowsSchema.pre('save', async function (next) {
    if (this.semana && this.semana._id) {
        this.semana = this.semana._id;
    }
    next();
});

module.exports = mongoose.model('Windows', WindowsSchema);