const Command = require('../../Structures/Command');

module.exports = class join extends Command {
    constructor(...args) {
        super(...args, {
            name: "join",
            category: "Music",
            ownerOnly: true
        })
    }
    async run(message) {
        if (!message.member.voice.channel) return message.reply("you need to join a voice channel.");
        const player = this.client.manager.get(message.guild.id);
        player.connect();
        return message.reply("Join the voice channel")
    }
}