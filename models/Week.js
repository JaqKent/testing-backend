const mongoose = require('mongoose');

const WeekSchema = mongoose.Schema({
    year: {
        type: String,
        required: true,
    },
    month: {
        type: String,
        required: true,
    },
    week: {
        type: String,
        required: true,
    },
    fechaCreacion: {
        type: Date,
        default: Date.now()
    },
    ventanas: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Windows'
    }

})

module.exports = mongoose.model('Week', WeekSchema);