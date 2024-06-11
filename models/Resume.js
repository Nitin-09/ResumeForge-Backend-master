const mongoose = require('mongoose');
const { Schema } = mongoose;

const ResumeSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    data: {
        type: Object,
        default: {}
    },
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('resume', ResumeSchema);
