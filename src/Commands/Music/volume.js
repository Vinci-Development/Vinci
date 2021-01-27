const Command = require('../../Structures/Command');

module.exports = class volume extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['vol'],
            description: "sets the volume to x.",
            category: "Music",
            nsfw: false,
            guildOnly: true,
            ownerOnly: false
        })
    }
    async run(message,args) {
        if (!message.member.voice.channel) return message.reply("you need to join a voice channel.");
        const player = this.client.manager.get(message.guild.id);
        if(!player) return message.channel.send("No song/s currently playing in this guild.");

        if (!args[0]) return message.channel.send(`Current Volume: ${player.volume}`);
        if (Number(args[0]) <= 0 || Number(args[0]) > 100) return message.channel.send("You may only set the volume to 1-100");

        player.setVolume(Number(args[0]));
        return message.channel.send(`Successfully set the volume to: ${args[0]}`)
    }
}