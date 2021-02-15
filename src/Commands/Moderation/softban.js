const Command = require("../../Structures/Command");
const {
    MessageEmbed
} = require('discord.js');

module.exports = class softban extends Command {
    constructor(...args) {
        super(...args, {
            name: "softban",
            aliases: ["tempban"],
            category: "Moderation",
            permissions: ["BAN_MEMBERS"]
        });
    }
    async run(message, args) {
        let person = message.guild.member(message.mentions.users.first());
        let time = args[2];
        if (!person) return message.channel.send('You did not provide a GuildMember!');
        if (!person.bannable) return message.channel.send('I cannot tempban this person.');
        if (person.id === message.author.id) return message.channel.send('You cannot tempban yourself!');
        
        if (!time) return message.channel.send('You must specify a time in days! (Ex: !tempban @Ferotiq#2857 1 They did something bad)');
        
        if (isNaN(time)) return message.channel.send(`${args[2]} is not a number!`);
        
        if (!isNaN(time)) time = parseFloat(args[2]);
        
        let reason = 'No reason specified';
        if (args[2]) reason = args.splice(3).join(" ");

        if (!person.user.bot) {
            person.send({
                embed: {
                    title: `Hello ${person.user.username}`,
                    description: `You have been banned from VinciMC\n Duration: ${time} day(s)\n Reason: ${reason}\n Banned by: ${message.author.tag}`
                }
            })
            person.send(`You have been banned from this server for ${time} day(s) for ${reason}.`);
        }

        person.ban({
            reason: reason,
            time: time
        });
        const embed = new MessageEmbed()
            .setTitle('`Tempban:`')
            .setDescription(`\`Time:\` \`${time} day(s)\`, \`Reason:\` \`${reason}\``)
            .setAuthor(message.member.displayName)
            .setColor("#ff0000")
            .setThumbnail(person.user.avatarURL())
            .addFields(
                {name: "Member ", value: person.user.username, inline: true},
                {name: "Member id ", value: person.user.id, inline: true},
                {name: "Moderator ", value: message.author.username, inline: true},
            )
            .setTimestamp();
    }
}