const Command = require('../../Structures/Command');

module.exports = class stop extends Command {
    constructor(...args) {
        super(...args, {
            aliases: [''],
            description: "stops the music.",
            category: "Music",
            nsfw: false,
            guildOnly: true,
            ownerOnly: false
        })
    }
    async run(message, args) {
        if (player.playing && player.paused) player.destroy();
    }
}