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

        const search = args.join(" ");
        let res;

        try {
            // Search for tracks using a query or url, using a query searches youtube automatically and the track requester object
            res = await this.client.manager.search(search, message.author);
            // Check the load type as this command is not that advanced for basics
            if (res.loadType === "LOAD_FAILED") throw res.exception;
            else if (res.loadType === "PLAYLIST_LOADED") throw {
                message: "Playlists are not supported with this command."
            };
        } catch (err) {
            return message.channel.send(
                new MessageEmbed()
                    .setTitle("**ERROR**")
                    .setDescription("there was an error while searching")
                    .addField("Search query: ", search)
                    .addField("Error message: ", err.message) 
            );
        }

        // Connect to the voice channel and add the track to the queue
        player.connect();
        player.queue.add(res.tracks[0]);

        // Checks if the client should play the track if it's the first one added
        if (!player.playing && !player.paused && !player.queue.size) player.play()
        const duration = ((res.tracks[0].duration/60000).toFixed(2).replace('.',':'));
        return message.channel.send(
            new MessageEmbed()
                .addFields(
                    {name: "Enqueuing: ", value: res.tracks[0].title, inline: true},
                    {name: "Duration: ", value: duration, inline: true},
                    {name: "Requested by: ", value: message.author.tag, inline: false},
                )
                .setThumbnail(message.author.displayAvatarURL({ dynamic: true, size: 512 }))
        )
    }
}   