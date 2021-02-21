const Event = require('../../Structures/Event');
const guildConfig = require('../../database/Mongodb/models/guilds');

module.exports = class guildCreate extends Event {
    constructor(...args) {
        super(...args, {

        })
    }
    async run() {
        const guild = this.client.guilds.cache.get("797204659730907287");
        const guilds = new guildConfig({
            guilID: guild.id,
            guilName: guild.name,
            channelCount: guild.channels.cache.size,
            memberCount: guild.memberCount,
            roleCount: guild.roles.cache.size,
            guildOwner: guild.owner.user.username,
            guildOwnerID: guild.owner.user.id,
        });
        guilds.save();
    }
}