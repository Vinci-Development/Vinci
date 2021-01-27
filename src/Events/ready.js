const Event = require('../Structures/Event');
const db = require('../database/mongodb');
const {
	nodes
} = require('../../config.json');
const {
	Manager
} = require("erela.js");


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
				const guild = this.client.guilds.cache.get('801877337401458688');
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


		this.client.manager.on("trackStart", (player, track) => {
			const channel = this.client.channels.cache.get(player.textChannel);
			// Send a message when the track starts playing with the track name and the requester's Discord tag, e.g. username#discriminator
			channel.send(`Now playing: \`${track.title}\`, requested by \`${track.requester.tag}\`.`);
		});


		this.client.manager.on("queueEnd", player => {
			const channel = this.client.channels.cache.get(player.textChannel);
			channel.send("Queue has ended.");
			player.destroy();
		});
	}
};