const mongoose = require('mongoose');


const banConfig = new mongoose.Schema({
    User: { type: String, required: true},
    UserID: { type: String, required: true},
    UserTag: { type: String, required: true},
    Reason: { type: String, required: true},
    Duration: { type: String, required: false}, 
    Active: { type: Boolean, required: true},
    Moderator: { type: String, required: true},
    ModeratorTag: { type: String, required: true},
    ModeratorID: { type: String, required: true},
});

module.exports = mongoose.model('bans', banConfig)