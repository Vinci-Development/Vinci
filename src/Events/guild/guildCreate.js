const Event = require('../../Structures/Event');
const Guilds = require('../../database/Mysql/Models/Guilds');

module.exports = class guildCreate extends Event {
    constructor(...args) {
        super(...args, {

        })
    }
    async run() {
        const guild = this.client.guilds.cache.get('797204659730907287');
        const bans = await guild.fetchBans();
        const guilds = await Guilds.create({
            guildName: guild.name,
            guildId: guild.id,
            memberSize: guild.memberCount,
            channelSize: guild.channels.cache.size,
            banSize: bans.size,
            roleSize: guild.roles.cache.size,
            guildOwner: guild.owner.user.tag,
            guildOwnerId: guild.owner.user.id
        });
        console.log("Joined " + guild.name);
    }
}