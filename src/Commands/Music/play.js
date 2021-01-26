const Command = require('../../Structures/Command');

module.exports = class ass extends Command {
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
            return message.reply(`there was an error while searching: ${err.message}`);
        }


        const player = this.client.manager.create({
            guild: message.guild.id,
            voiceChannel: message.member.voice.channel.id,
            textChannel: message.channel.id,
        });


        player.connect();
        player.queue.add(res.tracks[0]);
      
        // Checks if the client should play the track if it's the first one added
        if (!player.playing && !player.paused && !player.queue.size) player.play()
    
        return message.reply(`enqueuing ${res.tracks[0].title}.`);

    }
}