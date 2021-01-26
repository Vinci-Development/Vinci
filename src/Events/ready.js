const Event = require('../Structures/Event');
const db = require('../database/mongodb');
const { nodes } = require('../../config.json');
const { Manager } = require("erela.js");


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
		


		this.client.manager = new Manager({
			// The nodes to connect to, optional if using default lavalink options
			nodes,
			// Method to send voice data to Discord
			send: (id, payload) => {
			  const guild = client.guilds.cache.get('801877337401458688');
			  // NOTE: FOR ERIS YOU NEED JSON.stringify() THE PAYLOAD
			  if (guild) guild.shard.send(payload);
			}
		  });


		  this.client.manager.on("nodeConnect", node => {
			console.log(`Node "${node.options.identifier}" connected.`)
		})

		this.client.manager.on("nodeError", (node, error) => {
			console.log(`Node "${node.options.identifier}" encountered an error: ${error.message}.`)
		})
		

		this.client.on("raw", d => this.client.manager.updateVoiceState(d));

		 // Initiates the manager and connects to all the nodes
		 this.client.manager.init(this.client.user.id);
	}
};