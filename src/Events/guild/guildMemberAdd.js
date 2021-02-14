const Event = require('../../Structures/Event');

module.exports = class extends Event {
    constructor(...args) {
        super(...args)
    };
    async run(member) {
        const roles = this.client.guilds.roles.cache.find(r => r.name === 'member');

        member.roles.add(roles);
    }
}