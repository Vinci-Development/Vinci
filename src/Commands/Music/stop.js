const Command = require('../../Structures/Command');

module.exports = class stop extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['leave'],
            description: "stops the music.",
            category: "Music",
            nsfw: false,
            guildOnly: true,
            ownerOnly: false
        })
    }
    async run(message) {
        if (!message.member.voice.channel) return message.reply("you need to join a voice channel.");
        const player = this.client.manager.get(message.guild.id);
        if(!player) return message.channel.send("No song/s currently playing in this guild.");

        player.destroy();
        return message.channel.send("Successfully stopped the music.")
    }
}