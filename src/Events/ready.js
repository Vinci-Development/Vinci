const Event = require('../Structures/Event');
require('../database/Mongodb/mongodb');
const db = require('../database/Mysql/mysql');
const TicketConfig = require('../database/Mysql/Models/TicketConfig');
const Ticket = require('../database/Mysql/Models/Ticket');
const SocialPost = require("social-post-api");

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
		
		const social = new SocialPost("96JTPV5-W73MPYP-MTN6JPE-BW7NKH2");
		const channel = this.client.guild.channels.cache.get('797223892467843092');
		const post = await social.post({
			"post": "post",
			"platforms": ["twitter", "youtube"]
		}).catch(console.error);
		channel.send(post);
	}
};
