const Event = require('../../Structures/Event');
const Guilds = require('../../database/Mysql/Models/Guilds');


module.exports = class guildBanRemove extends Event {
    constructor(...args) {
        super(...args, {})
    }
    async run() {
        const guild = this.client.guilds.cache.get('797204659730907287');
        const bans = await guild.fetchBans();
        const guildConfig = await Guilds.findOne({ where: { guildId: guild.id }});

        guildConfig.banSize = bans.size;
        guildConfig.save();
    }
}