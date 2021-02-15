const { MessageEmbed } = require('discord.js');
const Command = require('../../Structures/Command');

module.exports = class pause extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['p'],
            description: 'Pauses the music.',
            guildOnly: true,
            category: "Music"
        });
    }
    async run(message) {
        if (!message.member.voice.channel) return message.reply("you need to join a voice channel.");
        const player = this.client.manager.get(message.guild.id);
        if(!player) return message.channel.send("No song/s currently playing in this guild.");
        player.pause(player.playing);
        const embed = new MessageEmbed()
            .setTitle("**Paused the music**")
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .addFields(
                {name: "Player is now", value: `${player.playing ? "resumed" : "paused"}`, inline: true},
                {name: "channel name:", value: "#"+message.channel.name, inline: true},
            )
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
            .setColor('RED')
            .setTimestamp();
        return message.channel.send(embed);
    }
}