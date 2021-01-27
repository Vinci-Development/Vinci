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
        const { voiceChannel } = message.member.voice;
        const player = this.client.manager.get(message.guild.id);
        if(!player) return message.channel.send("No song/s currently playing in this guild.");

        if(voiceChannel) return message.reply("You must be in a voice channel...")
        player.destroy();
        return message.channel.send("Successfully stopped the music.")
    }
}