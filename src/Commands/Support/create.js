const Command = require('../../Structures/Command');
const {
    MessageEmbed
} = require('discord.js');
const ticketConfig = require('../../database/models/ticketConfig');
const guildConfig = require('../../database/models/guildConfig');

module.exports = class create extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['new'],
            description: 'Creates a new support ticket.',
            category: 'Support'
        });
    }
    async run(message, args) {
        const guild = guildConfig.find(guild.id);
        const topic = args.slice(1).join(" ");

        if (!topic) return message.reply("You must provide a topic!").then(m => m.delete({
            timeout: 2000
        }));

        guild.channels.create(name, {
            type: 'text',
            topic: `${topic}`,
            parent: '801877337401458689',
            permissionOverwrites: [{
                    id: channel.guild.roles.everyone,
                    deny: ['VIEW_CHANNEL', 'CONNECT', 'SPEAK', 'STREAM']
                },
                {
                    id: message.author.id,
                    allow: ['VIEW_CHANNEL', 'CONNECT', 'SPEAK', 'STREAM']
                },
                {
                    id: '801879129996656720',
                    allow: ['VIEW_CHANNEL', 'CONNECT', 'SPEAK', 'STREAM']
                }
            ],
        }).then(async channel => {
            
        })
            
    }
}