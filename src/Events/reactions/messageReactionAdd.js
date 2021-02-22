const TicketConfig = require('../../database/Mysql/Models/TicketConfig');
const Ticket = require('../../database/Mysql/Models/Ticket');
const Event = require('../../Structures/Event');
const {
    MessageEmbed
} = require('discord.js');

module.exports = class messageReactionAdd extends Event {
    constructor(...args) {
        super(...args, {
            once: false
        })
    }
    async run(reaction, user) {
        if (user.bot) return console.log(user.username + " reacted and user is a bot returning... ");
        //reaction.cache.get('797398992451010572').remove().catch(error => console.error('Failed to remove reactions: ', error));
        if (reaction.emoji.name === '🎫') {
            const config = await TicketConfig.findOne({
                where: {
                    messageId: reaction.message.id
                }
            });
            if (config) {
                const findTicket = await Ticket.findOne({
                    where: {
                        authorId: user.id,
                        resolved: false
                    }
                });
                if (findTicket) user.send('You already have an active ticket... Please resolve it first!');
                else {
                    console.log("Creating ticket");
                    try {
                        const roleIdString = await TicketConfig.findAll({
                            attributes: ['roles']
                        });
                        const parentId = await TicketConfig.findAll({
                            attributes: ['parentId']
                        });
                        // const permissions = roleIdString.map((id) => ({ allow: 'VIEW_CHANNEL', id}));
                        const channel = await reaction.message.guild.channels.create('Ticket', {
                            type: 'text',
                            parent: parentId,
                            permissionOverwrites: [{
                                    deny: 'VIEW_CHANNEL',
                                    id: reaction.message.guild.id
                                },
                                {
                                    allow: 'VIEW_CHANNEL',
                                    id: user.id
                                }
                            ]
                        }).then(async msg => {
                            const ticket = await Ticket.create({
                                authorId: user.id,
                                channelId: channel.id,
                                guildId: reaction.message.guild.id,
                                resolved: false,
                                closedMessageId: msg.id
                            });

                            const embed = new MessageEmbed()
                                .setTitle("**VinciMC**")
                                .setDescription(`Hello ${user.tag}, you've submitted a support ticket!\nPlease wait til staff replys`)
                                .addFields({
                                    name: "ticket id: ",
                                    value: ticket.getDataValue('ticketId'),
                                    inline: true
                                }, {
                                    name: "channel id: ",
                                    value: channel.id,
                                    inline: true
                                }, {
                                    name: "Channel name: ",
                                    value: channel.name,
                                    inline: true
                                }, {
                                    name: "Created at: ",
                                    value: new Date(Date.now),
                                    inline: false
                                })
                                .setThumbnail(reaction.message.guild.iconURL({
                                    dynamic: true
                                }))
                                .setColor('RED');
                            await channel.send(embed).then(msg.react("🔒"));
                        });

                        const ticketId = String(ticket.getDataValue('ticketId')).padStart(4, 0);
                        await channel.edit({
                            name: `ticket-${ticketId}`
                        });
                    } catch (err) {
                        console.log(err)
                    }
                }
            }
        } else {
            console.log("No ticket configs found!");
        }
    }
}