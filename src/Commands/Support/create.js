const Command = require('../../Structures/Command');
const {
    MessageEmbed
} = require('discord.js');
const ticketConfig = require('../../database/models/ticketConfig');
const guildConfig = require('../../database/models/guildConfig');
const {
    default: ShortUniqueId
} = require('short-unique-id');
const uid = new ShortUniqueId();

module.exports = class create extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['new'],
            description: 'Creates a new support ticket.',
            category: 'Support',
            guildOnly: true
        });
    }
    async run(message, args) {
        const guild = message.guild;
        const topic = args.slice(1).join(" ");


        if(!topic) return message.reply('Invaild arguments...');
        guild.channels.create(`ticket-${uid()}`, {
            type: 'text',
            topic: `${topic}`,
            parent: '801877337401458689',
            permissionOverwrites: [{
                    id: guild.roles.everyone,
                    deny: ['VIEW_CHANNEL', 'CONNECT', 'SPEAK', 'STREAM']
                },
                {
                    id: message.author.id,
                    allow: ['VIEW_CHANNEL', 'CONNECT', 'SPEAK', 'STREAM']
                },
                {
                    id: '802142654279450644',
                    allow: ['VIEW_CHANNEL', 'CONNECT', 'SPEAK', 'STREAM']
                }
            ],
        }).then(async channel => {
            let confirm = await channel.send(
                new MessageEmbed()
                    .setTitle("**Vinci support")
                    .addFields(
                        {name: "channel id", value: channel.id, inline: true},
                        {name: "channel name", value: channel.name, inline: true},
                        {name: "topic", value: `${args[0]}`, inline: false},
                    )
                    .setTimestamp()
                    .setThumbnail(guild.iconURL())
                    .setFooter(`React with 📜 to get a transcript\nReact with 🔒 to close this ticket\nReact with 📌 to assist with this ticket`)
            );
            await confirm.react('📌');
            await confirm.react('📜');
            await confirm.react('🔒');
        })

    }
}