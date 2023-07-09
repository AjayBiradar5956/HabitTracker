const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
    title: {
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
    routine: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});

const Habit = mongoose.model('habit', habitSchema);

module.exports = Habit;