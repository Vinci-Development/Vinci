const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');
const banConfig = require('../../database/models/banConfig');

module.exports = class ban extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['test1'],
            description: 'bans the mentioned user of the discord server',
            category: 'Moderation',
            guildOnly: true,
            nsfw: false,
            PERMISSIONS: ['BAN_MEMBERS']
        });
    }

    async run(message, args) {
        const target = message.mentions.members.first();
        const reason = args.slice(1).join(" ");

        if(!reason) return message.reply("You must provide a reason");
        if (target) {
            
            const b = new MessageEmbed()
                .setAuthor(`${target.user.tag}`)
                .addFields({
                    name: `Banned member`,
                    value: `${target.user.tag}`,
                    inline: true
                }, {
                    name: "Banned by:",
                    value: `${message.author.tag}`,
                    inline: true
                }, {
                    name: "Reason",
                    value: `${reason}`,
                    inline: true
                }, {
                    name: "Date of punishment",
                    value: message.createdAt.toLocaleString()
                }, )
                .setThumbnail(target.user.displayAvatarURL())
                .setColor("#008b8b");

            message.channel.send(b);

            const bc = new banConfig({
                User: target.user.username,
                UserID: target.id,
                UserTag: target.user.discriminator,
                Reason: reason,
                Duration: "Forever", 
                Active: true,
                Moderator: message.author.username,
                ModeratorTag: message.author.discriminator,
                ModeratorID: message.author.id,
            });
            bc.save();

            await target.send({
                embed: {
                    title: `Dear ${target.user.tag}`,
                    description: `You have been banned from ${message.guild.name}\n \nBanned by: \n \n${message.author.tag} \n \nreason: ${reason}\n \nDate of punishment: ${message.createdAt.toLocaleString()}`,
                    color: `#008b8b`
                }
            }).then(async() => {
                target.ban(target.id).catch(err => {
                    console.log(err);
                });
            });
        }
    }
};