const Command = require('../../Structures/Command');


module.exports = class unban extends Command {
    constructor(...args) {
        super(...args, {
            aliases: [],
            description: 'unbans a member',
            category: 'Moderation',
            guildOnly: true,
            nsfw: false,
            PERMISSIONS: ['BAN_MEMBERS', 'ADMINISTRATOR']
        })
    }
    async run(message, args) {
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!user) return message.channel.send("You must provide a user to unban!")

        guild.user.unban();

        message.channel.send(`Unbanned ${user.user.tag}`);
    }
}