const Event = require('../Structures/Event');
const db = require('../database/mongodb');

module.exports = class extends Event {

	constructor(...args) {
		super(...args, {
			once: true
		});
	}

	async run() {
		// await db
		console.log([
			`Logged in as ${this.client.user.tag}`,
			`Loaded ${this.client.commands.size} commands!`,
			`Loaded ${this.client.events.size} events!`
		].join('\n'));
	}

};