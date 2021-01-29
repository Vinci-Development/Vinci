const Event = require('../Structures/Event');
const db = require('../database/mongodb');
const {
	nodes
} = require('../../config.json');
const { Manager } = require("erela.js");
const { MessageEmbed } = require('discord.js');

const clientID = "d5bb809e78a24c978dde6eee719294d5"; // clientID from your Spotify app
const clientSecret = "d41d68379bdf4777bd95da73ca67a5ed";
const Spotify = require("erela.js-spotify");

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
			plugins: [
				new Spotify({
					clientID,
					clientSecret
				})
			],
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
			const duration = ((track.duration / 60000).toFixed(2).replace('.', ':'));
			// Send a message when the track starts playing with the track name and the requester's Discord tag, e.g. username#discriminator
			channel.send(
				new MessageEmbed()
				.addFields({
					name: "Now playing:",
					value: track.title,
					inline: true
				}, {
					name: "Duration:",
					value: duration,
					inline: true
				}, {
					name: "requested by:",
					value: track.requester.tag,
					inline: true
				})
				.setTimestamp()
				.setTitle("Finding a new song....")
				.setThumbnail(track.requester.displayAvatarURL({
					dynamic: true,
					size: 512
				}))
			);
		});


		this.client.manager.on("queueEnd", player => {
			const channel = this.client.channels.cache.get(player.textChannel);
			channel.send("Queue has ended.");
			setTimeout(() => {
				message.reply("Queue hass ended leaving voice channel in 2 minutes...")
				player.destroy();
			}, 120000)
		});
	}
};