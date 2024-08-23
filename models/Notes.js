import mongoose from 'mongoose';

const noteSchema = mongoose.Schema({
    title: {
        type: String,
        default: '',
        maxlength: [40, 'Very long name maximum 40']
    },
    description: {
        type: String,
        default: ''
    },
    workspace: {
        type: String,
        default: 'workspace by default'
    },
    createBy: {
        type: mongoose.Schema.ObjectId, ref: 'user'
    },
    createDate: {
        type: Date

    },
    updateDate: {
        type: Date
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
    },
    image: {
        type: String,
        default: ''
    }
});
const note = mongoose.model('note', noteSchema);

export default note;