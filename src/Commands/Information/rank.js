const Command = require('../../Structures/Command');
const canvacord = require('canvacord');
const { MessageAttachment } = require('discord.js');

module.exports = class rank extends Command {
    constructor(...args) {
        super(...args, {
            aliases: [],
            description: "displays rank info",
            guildOnly: true
        });
    }

    async run(message, args) {

        Profile.findOne(
            {
                guild: message.guild.id,
				userId: message.author.id,
                name: message.author.username, 
            }
        )
        const member = message.mentions.members.last() || message.guild.members.cache.get(args[0]) || message.member;

        const rank = new canvacord.Rank()
            .setAvatar(member.user.displayAvatarURL({ dynamic: false, format: 'png' }))
            .setCurrentXP("")
            .setRequiredXP(Profile.total_xp)
            .setStatus(member.user.presence.status)
            .setProgressBar("#FFFFFF", "COLOR")
            .setUsername(member.user.username)
            .setDiscriminator(member.user.discriminator);

        rank.build()
            .then(data => {
                const attachment = new MessageAttachment(data, "RankCard.png");
                message.channel.send(attachment);
            });
    }
}