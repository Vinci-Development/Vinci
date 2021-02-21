const mongoose = require('mongoose');

const GuildSchema = new mongoose.Schema({
    guilID: { type: String, required: false },
    guilName: { type: String, required: false },
    channelCount: { type: Number, required: false },
    memberCount: { type: Number, required: false },
    roleCount: { type: Number, required: false },
    guildOwner: { type: String, required: false },
    guildOwnerID: { type: String, required: false },
    lastUpdated: { type: Date, default: new Date() }
});

module.exports = mongoose.model('guilds', GuildSchema);