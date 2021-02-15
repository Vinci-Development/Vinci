const { MessageEmbed } = require('discord.js');
const Command = require('../../Structures/Command');
const { stripIndents } = require("common-tags");
const { Utils } = require('erela.js');

module.exports = class nowplaying extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['np'],
            description: 'Shows what is currently playing.',
            guildOnly: true,
            category: "Music"
        });
    }
    async run(message) {
        message.delete({ timeout: 3000 });
        setTimeout(() => {
            return message.reply("The nowplaying command is being developed atm");
        }, 2000)
        /*
        if (!message.member.voice.channel) return message.reply("you need to join a voice channel.");
        const player = this.client.manager.get(message.guild.id);
        const { title, author, duration, thumbnail } = player.queue.get.size();

        const embed = new MessageEmbed()
            .setAuthor("Current Song Playing.", message.author.displayAvatarURL)
            .setThumbnail(thumbnail)
            .setDescription(stripIndents`
            ${player.playing ? "▶️" : "⏸️"} **${title}** \by ${author}
            `);

        return message.channel.send(embed);
 */
    }
}