const Command = require('../../Structures/Command');
const trev = require('trev');
const { MessageEmbed } = require('discord.js');

module.exports = class cum extends Command {
    constructor(...args) {
        super(...args, {
            aliases: [''],
            description: "pussy pics.",
            nsfw: true,
        })
    }
    async run(message) {
        const vigs = await trev.subreddits.nsfw.cum();
        message.delete( {timeout: 3000 }); 
        
        if (trev.isGfyLink(vigs.media)) {
            const newURL = trev.gfyIframe(vigs.media);
            message.channel.send(newURL);
        } else {
            const embed = new MessageEmbed()
                .setAuthor(`Here have some cum❤️`)
                .addFields({
                    name: `Author`,
                    value: `${vigs.author}`,
                    inline: true
                }, {
                    name: "From:",
                    value: `${vigs.subreddit}`,
                    inline: true
                }, {
                    name: "Link",
                    value: `${vigs.media}`,
                    inline: true
                }, {
                    name: "NSFW",
                    value: vigs.over_18
                }, )
                .setImage(vigs.media)
                .setColor("#008b8b");
            return message.channel.send(embed);
        }
    }
}