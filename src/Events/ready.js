const Event = require('../Structures/Event');
require('../database/Mongodb/mongodb');
const db = require('../database/Mysql/mysql');
const TicketConfig = require('../database/Mysql/Models/TicketConfig');
const Ticket = require('../database/Mysql/Models/Ticket');

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

		db.authenticate().then(() => {
			console.log("Successfully connected to the MySQL database...");
			Ticket.init(db);
			TicketConfig.init(db);
			Ticket.sync();
			TicketConfig.sync();
		}).catch(err => console.log(err));
	}
};
