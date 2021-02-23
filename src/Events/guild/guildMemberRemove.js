const Event = require('../../Structures/Event');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');
const gc = require('../../database/Mysql/Models/Guilds');

module.exports = class guildMemberRemove extends Event {
    constructor(...args) {
        super(...args)
    };
    async run(member) {
        const guild = this.client.guilds.cache.get('797204659730907287');  
        const counter = guild.memberCount.toLocaleString();
        const guildConfig = await gc.findOne({ where: { guildId: guild.id }});

        if(guildConfig) {
            guildConfig.memberSize = counter
            await guildConfig.save();
        }
    }
}
