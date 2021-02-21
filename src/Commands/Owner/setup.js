const Command = require('../../Structures/Command');
const TicketConfig = require('../../database/Mysql/Models/TicketConfig');

const { MessageEmbed } = require('discord.js');

module.exports = class setup extends Command {
    constructor(...args) {
        super(...args, {
            aliases: [''],
            category: "Owners",
            nsfw: false,
            ownerOnly: true
        })
    }
    async run(message, args) {
        message.delete();
        const embed = new MessageEmbed()
            .setDescription(`**REACT WITH 🎫 TO CREATE A TICKET**`)
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .setTitle("**VinciMC**")
            .setColor("#67d156")
            .setTimestamp();
        message.channel.send(embed);
        const filter = (m) => m.author.id === message.author.id;
        message.channel.send("Please enter the message id for this ticket");
        const msgId = (await message.channel.awaitMessages(filter, { max: 1 })).first().content;
        const fetchMsg = await message.channel.messages.fetch(msgId);
        message.channel.send("Please enter the category id for this ticket");
        const categoryId = (await message.channel.awaitMessages(filter, { max: 1 })).first().content;
        const categoryChannel = this.client.channels.cache.get(categoryId);
        message.channel.send("Please enter all of the roles that have access to tickets");
        const roles = (await message.channel.awaitMessages(filter, { max: 1 })).first().content.split(/,\s*/);
        if(fetchMsg && categoryChannel) {
            for (const roleId of roles)
                if (!message.guild.roles.cache.get(roleId)) throw new Error('Role does not exist');
                
                
            const config = await TicketConfig.create({
                messageId: msgId,
                guildId: message.guild.id,
                roles: JSON.stringify(roles),
                parentId: categoryChannel.id
            });
            message.reply("Content saved to the database... ");
            await fetchMsg.react('🎫');
        } else throw new Error('Invaild fields');
    }
};