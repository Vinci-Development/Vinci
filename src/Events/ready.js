const Event = require('../Structures/Event');
const db = require('../database/mongodb');
const { nodes } = require('../../config.json');
const { Manager } = require("erela.js");
const server = require("../dashboard/server");

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

	}
};
