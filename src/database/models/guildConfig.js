const mongoose = require ( 'mongoose' )

const guildConfigSchema = new mongoose.Schema ({
    //Parse user info to database on each request later for dashboard implementation.
    guildId: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true,
        setDefaultsOnInsert: true,
    },
    prefix: {
        type: mongoose.SchemaTypes.String,
        required: true,
        default: "v!",
        setDefaultsOnInsert: true,
    },
    defaultRole: {
        type: mongoose.SchemaTypes.String,
        required: false,
    },
    guildName: {
        type: mongoose.SchemaTypes.String,
        required: true,
        setDefaultsOnInsert: true
    },
    memberCount: {
        type: Number,
        required: true,
    },
    channelCount: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Guilds', guildConfigSchema );