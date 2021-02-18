const mongoose = require('mongoose');

const GuildSchema = new mongoose.Schema({
    guilID: { type: String, required: true },
    guilName: { type: String, required: true },
    channelCount: { type: Number, required: true },
    memberCount: { type: Number, required: true },
    roleCount: { type: Number, required: true },
    guildOwner: { type: String, required: true },
    guildOwnerID: { type: String, required: true },
    lastUpdated: { type: Date, default: new Date(), required: true }
});

module.exports = mongoose.model('guilds', GuildSchema);