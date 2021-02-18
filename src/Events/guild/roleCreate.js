const Event = require('../../Structures/Event');
const gc = require('../../database/models/guilds');

module.exports = class rolecreate extends Event {
    constructor(...args) {
        super(...args, {
            once: true
        })
    }
    async run() {
        const guild = this.client.guilds.cache.get('797204659730907287');
        console.log("a role has been created...");

        const idk = new gc({
            roleCount: guild.roles.cache.size
        });

        idk.update({ name: "roleCount" }, function (err, res) {
            if(err) {
                console.log(err)
            } else {
                console.log(`role count ${res}`)
            }
        })
    }
}