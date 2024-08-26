const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        default: '',
        maxlength: [40, 'Very long name maximum 40']
    },
    description: {
        type: String,
        default: ''
    },
    usuarioCreador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    createDate: {
        type: Date,
        default: Date.now
    },
    updateDate: {
        type: Date,
        default: Date.now
    },
    active: {
        type: Boolean,
        default: true
    },
    status: {
        type: String,
        default: 'active'
    },
    ejeX: {
        type: Number,
        default: 20
    },
    ejeY: {
        type: Number,
        default: 20
    }
});

module.exports = mongoose.model('Note', noteSchema);
