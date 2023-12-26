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
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
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