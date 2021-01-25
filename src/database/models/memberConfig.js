const { SystemChannelFlags } = require('discord.js');
const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
    Username: {type: String, required: true},
    UserID: {type: String, required: true},
    UserTag: {type: String, required: true},
    JoinDate: {type: String, required: true},
    GuildArray: [{type: mongoose.Types.ObjectId, ref: 'Guilds'}],
    XP: {type:Number, default: 0},
    Level: {type: Number, default: 1},
    Currency: {type: Number, default: 0},
    isBanned: {type: Boolean, required: true}
});

module.exports =  mongoose.model('Members', MemberSchema);