const Event = require('../../Structures/Event');
const Guilds = require('../../database/Mysql/Models/Guilds');

module.exports = class guildCreate extends Event {
    constructor(...args) {
        super(...args, {

        })
    }
    async run() {
        const bans = await guild.fetchBans();
        const guild = this.client.guilds.cache.get('797204659730907287');
        const guilds = await Guilds.create({
            guildName: guild.name,
            guildId: guild.id,
            memberSize: guild.memberCount,
            channelSize: guild.channels.cache.size,
            banSize: bans.size,
            roleSize: guild.roles.cache.size,
            guildOwner: guild.owner.user.username,
            guildOwnerId: guild.owner.user.id
        });
    }
}