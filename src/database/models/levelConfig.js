const mongoose = require('mongoose');

const levelConfig = new mongoose.Schema({
    guild: {
        type: String,
        required: true
    },
    level: {
        type: Number,
        required: true,
    },
    xp: {
        type: Number,
        required: true,
    },
    totalXp: {
        type: Number,
        required: true
    }
});

module.exports = new mongoose.model('Leveling', levelConfig);