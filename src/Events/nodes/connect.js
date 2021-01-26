const Event = require('../../Structures/Event');

module.exports = class connect extends Event {
    constructor(...args) {
        super(...args, {
        });
    }

    async run() {
        this.client.manager.on("nodeConnect", node => {
			console.log(`Node "${node.options.identifier}" connected.`)
		})
    }
}