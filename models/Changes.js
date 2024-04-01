const CambioSchema = mongoose.Schema({
    fecha: {
        type: Date,
        default: Date.now()
    },
    campo: {
        type: String,
        required: true
    },
    valorAnterior: {
        type: String,
    },
    valorNuevo: {
        type: String,
        required: true
    }

});