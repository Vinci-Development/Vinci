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
    async run(message) {
    }
};