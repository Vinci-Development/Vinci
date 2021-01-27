const mongoose = require('mongoose');

const levelConfig = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    level: {
        type: Number,
        required: true
    },
    xp: {
        type: Number,
        required: true
    },
    total_xp: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    guild: {
        type: String,
        required: true
    }
});

module.exports = new mongoose.model('Leveling', levelConfig);