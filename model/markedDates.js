const mongoose = require('mongoose');
const markedDateSchema = new mongoose.Schema({
    habit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Habit',
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
});

const MarkedDate = mongoose.model('MarkedDate', markedDateSchema);
module.exports = MarkedDate;
