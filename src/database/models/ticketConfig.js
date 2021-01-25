const mongoose = require('mongoose');

const ticketConfig = new mongoose.Schema({
    channelName: {type: String, required: true},
    channelID: {type: String, required: true},
    author: {type: String, required: true},
    authorID: {type: String, required: true},
    moderator: {type: String, required: false},
    moderatorID: {type: String, required: false},
    created: {type: String, required: true},
    resolved: {type: String, required: true} 
});

module.exports = mongoose.model('Tickets', ticketConfig);