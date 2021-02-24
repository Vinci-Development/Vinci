const Event = require('../Structures/Event');
require('../database/Mongodb/mongodb');
const db = require('../database/Mysql/mysql');

module.exports = class extends Event {

	constructor(...args) {
		super(...args, {
			once: true
		});
	}

	async run() {
		
		console.log([
			`Logged in as ${this.client.user.tag}`,
			`Loaded ${this.client.commands.size} commands!`,
			`Loaded ${this.client.events.size} events!`
		].join('\n'));

		db.authenticate()
			.then(() => {
				console.log("Connected to MySQL database...");
			}).catch(err => console.log(err));
	}
};