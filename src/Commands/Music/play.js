const Command = require('../../Structures/Command');
const {
    MessageEmbed
} = require('discord.js')
const {
    Utils
} = require('erela.js');

module.exports = class play extends Command {
    constructor(...args) {
        super(...args, {
            aliases: [''],
            description: "plays music.",
            category: "Music",
            nsfw: false,
            guildOnly: true,
            ownerOnly: false
        })
    }
    async run(message, args) {
        if (!message.member.voice.channel) return message.reply("you need to join a voice channel.");
        if (!args.length) return message.reply("you need to give me a URL or a search term.");

        if (!message.guild.me.hasPermission("CONNECT")) return message.channel.send("I cannot connect to your voice channel, make sure I have permission to!");
        if (!message.guild.me.hasPermission("SPEAK")) return message.channel.send("I cannot connect to your voice channel, make sure I have permission to!");

        const player = this.client.manager.create({
            guild: message.guild.id,
            voiceChannel: message.member.voice.channel.id,
            textChannel: message.channel.id,
        });

        player.connect();
    }
}   